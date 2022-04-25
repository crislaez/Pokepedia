import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { fromMove, MoveActions } from '@newPokeData/shared/move';
import { PokemonList } from '@newPokeData/shared/pokemon';
import { clearName, getClassColor, getPokemonPokedexNumber, gotToTop } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { PokemonModalComponent } from 'src/app/pokemon/containers/pokemon-modal.component';
import { TypeModalComponent } from 'src/app/type/containers/type-modal.component';

@Component({
  selector: 'app-move-modal',
  template:`
  <ng-container *ngIf="(move$ | async) as move">
    <ng-container *ngIf="(status$ | async) as status">
      <ng-container *ngIf="status !== 'pending'; else loader">
        <ng-container *ngIf="status !== 'error'; else serverError">

          <!-- HEADER  -->
          <ion-header class="ion-no-border" [ngClass]="getClassColor(move?.type?.name)" >
            <ion-toolbar>
              <ion-buttons class="text-color-dark" slot="end">
                <ion-button [ngClass]="getClassColor(move?.type?.name)" (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <!-- MAIN  -->
          <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
            <div class="type-banner displays-center" [ngClass]="getClassColor(move?.type?.name)">
              <div class="type-banner-name capital-letter">
                {{ clearName(move?.name) }}
              </div>
            </div>

            <div class="container components-background-dark" >
              <ion-segment (ionChange)="segmentChanged($any($event))" [(ngModel)]="selected">
                <ion-segment-button *ngFor="let item of itemsSegments; let i = index;" [value]="item?.id" class="text-color-dark components-background-dark">
                  <ion-label>{{ item?.label | translate }}</ion-label>
                </ion-segment-button>
              </ion-segment>

              <ng-container *ngIf="selected === options?.about">
                <app-about
                  [move]="move"
                  (openTypeModal)="openTypeModal($event)">
                </app-about>
              </ng-container>

              <ng-container *ngIf="selected === options?.learnIt">
                <app-pokemon-card
                  *ngIf="move?.learned_by_pokemon?.length > 0; else noDataItem"
                  [pokemonList]="move?.learned_by_pokemon"
                  (openPokemondModal)="openPokemondModal($event)">
                </app-pokemon-card>

                <!-- INFINITE SCROLL  -->
                <app-infinite-scroll
                  [slice]="statusComponent?.pokemonSlice"
                  [total]="move?.totalPokemon"
                  [status]="status"
                  (loadDataTrigger)="loadData($event)">
                </app-infinite-scroll>
              </ng-container>

              <!-- REFRESH -->
              <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
              </ion-refresher>
            </div>

            <!-- TO TOP BUTTON  -->
            <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
              <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
            </ion-fab>
          </ion-content>

        </ng-container>
      </ng-container>
    </ng-container>
  </ng-container>

  <!-- IS ERROR -->
  <ng-template #serverError>
    <app-empty-modal [title]="'COMMON.ERROR'" (dismiss)="dismiss()" [image]="'assets/images/error.png'" [top]="'30vh'"> </app-empty-modal>
  </ng-template>

  <!-- IS NO DATA  -->
  <ng-template #noData>
    <app-empty-modal [title]="'COMMON.NORESULT'" (dismiss)="dismiss()" [image]="'assets/images/empty.png'" [top]="'30vh'"> </app-empty-modal>
  </ng-template>

  <ng-template #noDataItem>
    <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
  </ng-template>

  <!-- LOADER  -->
  <ng-template #loader>
    <ion-header class="ion-no-border" >
    </ion-header>
    <ion-content>
      <app-spinner [top]="'75%'"></app-spinner>
    </ion-content>
  </ng-template>
  `,
  styleUrls: ['./move-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveModalComponent {

  gotToTop = gotToTop;
  clearName = clearName;
  getClassColor = getClassColor;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  @ViewChild(IonContent) content: IonContent;
  @Input() set move(move: Common){
    const { name = null, url = null } = move || {};
    this.statusComponent = {...this.statusComponent, moveId:this.getPokemonPokedexNumber(url)};
    setTimeout(() => {this.chargeMoveInfoTrigger.next(this.statusComponent)},0)
  };

  showButton = false;
  selected = 1;
  itemsSegments = [
    {id:1, label:'COMMON.ABOUT'},
    {id:2, label:'COMMON.LEARN_IT'},
  ];

  options = {
    about: 1,
    learnIt: 2,
  };

  status$ = this.store.select(fromMove.selectMoveStatus);
  chargeMoveInfoTrigger = new EventEmitter<{moveId:string, url:string, reload:boolean, pokemonSlice?:number}>();
  statusComponent:{moveId:string, url:string, reload:boolean, pokemonSlice?:number} = {
    moveId:'',
    url:'',
    reload: true,
    pokemonSlice:20
  };

  move$ = this.chargeMoveInfoTrigger.pipe(
    tap(({moveId:id, reload}) => {
      if(id && reload) this.store.dispatch(MoveActions.loadMove({id}))
    }),
    switchMap(({pokemonSlice}) =>
      this.store.select(fromMove.selectMove).pipe(
        map((move) => {
          return {
            ...move,
            learned_by_pokemon: (move?.learned_by_pokemon || [])?.slice(0, pokemonSlice),
            totalPokemon: move?.learned_by_pokemon?.length
          }
        })
      )
    )
  );


  constructor(
    private store: Store,
    private modalController: ModalController
  ) { }



  segmentChanged({detail:{value}}): void{
    this.selected = Number(value);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.chargeMoveInfoTrigger.next(this.statusComponent);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.statusComponent = {
      ...this.statusComponent,
      reload: false,
      pokemonSlice: this.statusComponent.pokemonSlice + 20
    };
    this.chargeMoveInfoTrigger.next(this.statusComponent);
    event.target.complete();
  }

  // CLOSE MODAL
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

  // SHOW SINGLE CARD
  async openPokemondModal(pokemon: PokemonList) {
    this.dismiss();
    const modal = await this.modalController.create({
      component: PokemonModalComponent,
      componentProps:{
        pokemon
      }
    });
    return await modal.present();
  }

  // SHOW SINGLE CARD
  async openTypeModal(type: Common) {
    this.dismiss();
    const modal = await this.modalController.create({
      component: TypeModalComponent,
      componentProps:{
        type
      }
    });
    return await modal.present();
  }

}
