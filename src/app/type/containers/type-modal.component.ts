
import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { PokemonList } from '@newPokeData/shared/pokemon';
import { fromType, TypeActions } from '@newPokeData/shared/type';
import { clearName, emptyObject, getClassColor, getPokemonPokedexNumber, gotToTop, trackById } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { MoveModalComponent } from 'src/app/move/containers/move-modal.component';
import { PokemonModalComponent } from 'src/app/pokemon/containers/pokemon-modal.component';

interface Slices{
  total:number,
  slice:number
}

@Component({
  selector: 'app-type-modal',
  template:`
  <ng-container *ngIf="(type$ | async) as type">
    <ng-container *ngIf="(status$ | async) as status">
      <ng-container *ngIf="status !== 'pending'; else loader">
        <ng-container *ngIf="status !== 'error'; else serverError">
          <ng-container *ngIf="emptyObject(type); else noData">

            <!-- HEADER  -->
            <ion-header class="ion-no-border" [ngClass]="getClassColor(type?.name)" >
              <ion-toolbar>
                <ion-buttons class="text-color-dark" slot="end">
                  <ion-button [ngClass]="getClassColor(type?.name)" (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" name="close-outline"></ion-icon></ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>

            <!-- MAIN  -->
            <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
              <div class="type-banner displays-center" [ngClass]="getClassColor(type?.name)">
                <div class="type-banner-name capital-letter text-color-light">
                  {{ clearName(type?.name) }}
                </div>
              </div>

              <div class="container components-background-dark" >
                <ion-segment (ionChange)="segmentChanged($any($event))" [(ngModel)]="selected">
                  <ion-segment-button *ngFor="let item of itemsSegments; let i = index; trackBy: trackById" [value]="item?.id" class="text-color-dark components-background-dark">
                    <ion-label>{{ item?.label | translate }}</ion-label>
                  </ion-segment-button>
                </ion-segment>

                <ng-container *ngIf="selected === options?.about">
                  <app-about
                    [type]="type"
                    (openTypeModal)="openTypeModal($event)">
                  </app-about>
                </ng-container>

                <ng-container *ngIf="selected === options?.allMoves">
                  <app-item-card
                    [moveList]="type?.moves"
                    (opendModal)="openMoveModal($event)">
                  </app-item-card>

                  <!-- INFINITE SCROLL  -->
                  <app-infinite-scroll
                    [slice]="statusComponent?.movesSlice"
                    [total]="type?.totalMove"
                    [status]="status"
                    (loadDataTrigger)="loadData($event, false)">
                  </app-infinite-scroll>
                </ng-container>

                <ng-container *ngIf="selected === options?.thatType">
                  <app-pokemon-card
                    [pokemonList]="type?.pokemon"
                    (openPokemondModal)="openPokemondModal($event)">
                  </app-pokemon-card>

                  <!-- INFINITE SCROLL  -->
                  <app-infinite-scroll
                    [slice]="statusComponent?.pokemonSlice"
                    [total]="type?.totalPokemon"
                    [status]="status"
                    (loadDataTrigger)="loadData($event, true)">
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
  </ng-container>

  <!-- IS ERROR -->
  <ng-template #serverError>
    <app-empty-modal [title]="'COMMON.ERROR'" (dismiss)="dismiss()" [image]="'assets/images/error.png'" [top]="'30vh'"> </app-empty-modal>
  </ng-template>

  <!-- IS NO DATA  -->
  <ng-template #noData>
    <app-empty-modal [title]="'COMMON.NORESULT'" (dismiss)="dismiss()" [image]="'assets/images/empty.png'" [top]="'30vh'"> </app-empty-modal>
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
  styleUrls: ['./type-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeModalComponent {

  gotToTop = gotToTop;
  clearName = clearName;
  trackById = trackById;
  emptyObject = emptyObject;
  getClassColor = getClassColor;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  @ViewChild(IonContent) content: IonContent;
  @Input() set type(type: Common){
    const { name = null, url = null } = type || {};
    this.statusComponent = {...this.statusComponent, typeId:this.getPokemonPokedexNumber(url), reload:true};
    setTimeout(() => {this.chargeMoveInfoTrigger.next(this.statusComponent)},0)
  };
  showButton = false;
  selected = 1;
  itemsSegments = [
    {id:1, label:'COMMON.ABOUT'},
    {id:2, label:'COMMON.ALL_MOVES'},
    {id:3, label:'COMMON.THAT_TYPE'},
  ];

  options = {
    about: 1,
    allMoves: 2,
    thatType: 3,
  };

  status$ = this.store.select(fromType.selectTypeStatus);
  chargeMoveInfoTrigger = new EventEmitter<{typeId:string, url:string, reload:boolean, pokemonSlice?:number, movesSlice?:number}>();
  statusComponent:{typeId:string, url:string, reload:boolean, pokemonSlice?:number, movesSlice?:number} = {
    typeId:'',
    url:'',
    reload: true,
    pokemonSlice:20,
    movesSlice: 20
  };

  type$ = this.chargeMoveInfoTrigger.pipe(
    tap(({typeId: id, reload}) => {
      if(id && reload) this.store.dispatch(TypeActions.loadType({id}))
    }),
    switchMap(({pokemonSlice, movesSlice}) =>
      this.store.select(fromType.selectType).pipe(
        map(type => {
          return {
            ...type,
            pokemon: type?.pokemon?.slice(0, pokemonSlice),
            totalPokemon: type?.pokemon?.length,
            moves: type?.moves?.slice(0, movesSlice),
            totalMove: type?.moves?.length
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
      this.statusComponent = {
        ...this.statusComponent,
        reload: true,
        pokemonSlice:20,
        movesSlice: 20
      };
      this.chargeMoveInfoTrigger.next(this.statusComponent);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}, isPokemon) {
    this.statusComponent = {
      ...this.statusComponent,
      reload: false,
      ...(isPokemon ? {pokemonSlice: this.statusComponent.pokemonSlice + 20} : {movesSlice: this.statusComponent.movesSlice + 20})
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
  async openMoveModal(move: Common) {
    this.dismiss();
    const modal = await this.modalController.create({
      component: MoveModalComponent,
      componentProps:{
        move
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
