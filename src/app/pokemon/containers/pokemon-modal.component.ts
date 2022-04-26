import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { fromPokemon, PokemonActions } from '@newPokeData/shared/pokemon';
import { Pokemon, PokemonList } from '@newPokeData/shared/pokemon/models';
import { clearName, errorImage, getClassColorType, getPokemonImage, getPokemonPokedexNumber, gotToTop } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { AbilityModalComponent } from 'src/app/ability/containers/ability-modal.component';
import { MoveModalComponent } from 'src/app/move/containers/move-modal.component';
import { TypeModalComponent } from 'src/app/type/containers/type-modal.component';


@Component({
  selector: 'app-pokemon-modal',
  template:`
  <ng-container *ngIf="(pokemon$ | async) as pokemon">
    <ng-container *ngIf="(status$ | async) as status">
      <ng-container *ngIf="status !== 'pending'; else loader">
        <ng-container *ngIf="status !== 'error'; else serverError">

          <!-- HEADER  -->
          <ion-header class="ion-no-border" [ngClass]="getClassColorType(pokemon)">
            <ion-toolbar>
              <ion-buttons class="text-color-dark" slot="end">
                <ion-button (click)="dismiss()"><ion-icon fill="clear" class="text-color-light" [ngClass]="getClassColorType(pokemon)" name="close-outline"></ion-icon></ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <!-- MAIN  -->
          <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">
            <div class="pokemon-banner" [ngClass]="getClassColorType(pokemon)">
              <div class="pokemon-banner-name displays-around">
                <div class="capital-letter">
                  {{ clearName(pokemon?.name) }}
                </div>
                <div>
                  # {{getPokemonPokedexNumber(statusComponent?.url)}}
                </div>
              </div>

              <div class="pokemon-banner-type">
                <ion-chip *ngFor="let type of getPokemonTypes(pokemon)"
                  [ngStyle]="{'box-shadow':type?.name === 'dark' ? '0px 0px 10px white' : '0px 0px 10px gray' }"
                  [ngClass]="type?.name"
                  (click)="openTypeModal(type)">

                  <ion-label>{{ type?.name }}</ion-label>
                </ion-chip>
              </div>
            </div>

            <div class="container components-background-dark" >
              <div class="width-max displays-center">
                <ion-avatar class="pokemon-principal-image" slot="start">
                  <img loading="lazy" [src]="getPokemonImage(pokemon)" [alt]="pokemon?.name" (error)="errorImage($event)">
                </ion-avatar>
              </div>

              <ion-segment scrollable (ionChange)="segmentChanged($any($event))" [(ngModel)]="selected">
                <ion-segment-button *ngFor="let item of itemsSegments; let i = index;" [value]="item?.id" class="text-color-dark components-background-dark">
                  <ion-label>{{ item?.label | translate }}</ion-label>
                </ion-segment-button>
              </ion-segment>

              <ng-container *ngIf="selected === options?.about">
                <app-about
                  [pokemon]="pokemon"
                  (openPokemonModal)="openPokemonModal($event)">
                </app-about>
              </ng-container>

              <ng-container *ngIf="selected === options?.abilities">
                <app-abilities
                  [pokemon]="pokemon"
                  (openAbilityModal)="openAbilityModal($event)">
                </app-abilities>
              </ng-container>

              <ng-container *ngIf="selected === options?.encounters">
                <app-encounters
                  [pokemon]="pokemon">
                </app-encounters>
              </ng-container>

              <ng-container *ngIf="selected === options?.evolutions">
                <app-evolutions
                  [pokemon]="pokemon"
                  (openPokemonModal)="openPokemonModal($event)">
                </app-evolutions>
              </ng-container>

              <ng-container *ngIf="selected === options?.moves">
                <app-moves
                  [pokemon]="pokemon"
                  (openMovedModal)="openMovedModal($event)">
                </app-moves>
              </ng-container>

              <ng-container *ngIf="selected === options?.sprites">
                <app-sprites
                  [pokemon]="pokemon">
                </app-sprites>
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

  <!-- LOADER  -->
  <ng-template #loader>
    <ion-header class="ion-no-border" >
    </ion-header>
    <ion-content>
      <app-spinner [top]="'75%'"></app-spinner>
    </ion-content>
  </ng-template>
  `,
  styleUrls: ['./pokemon-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonModalComponent {

  gotToTop = gotToTop;
  clearName = clearName;
  errorImage = errorImage;
  getPokemonImage = getPokemonImage;
  getClassColorType = getClassColorType;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  @ViewChild(IonContent) content: IonContent;
  @Input() set pokemon(pokemon: PokemonList){
    const { name = null, url = null } = pokemon || {};
    this.statusComponent = {pokemonId:this.getPokemonPokedexNumber(url), url};
    setTimeout(() => {this.chargePokemonInfoTrigger.next(this.statusComponent)},0);
  };

  showButton = false;
  selected = 1;
  itemsSegments = [
    {id:1, label:'COMMON.ABOUT'},
    {id:2, label:'COMMON.ABILITIES_TITLE'},
    {id:3, label:'COMMON.ENCOUNTERS'},
    {id:4, label:'COMMON.CHAIN_EVOLUTION'},
    {id:5, label:'COMMON.MOVES_TITLE'},
    {id:6, label:'COMMON.SPRITES'}
  ];

  options = {
    about: 1,
    abilities: 2,
    encounters: 3,
    evolutions: 4,
    moves: 5,
    sprites: 6
  };

  chargePokemonInfoTrigger = new EventEmitter<{pokemonId:string, url:string}>();
  statusComponent:{pokemonId:string, url:string} = {
    pokemonId:'',
    url:''
  };

  status$ = this.store.select(fromPokemon.selectPokemonStatus);
  pokemon$ = this.chargePokemonInfoTrigger.pipe(
    tap(({pokemonId:id}) => {
      if(id) this.store.dispatch(PokemonActions.loadPokemon({id}))
    }),
    switchMap(() => {
      return this.store.select(fromPokemon.selectPokemon)
    })
  );


  constructor(
    private store: Store,
    public platform: Platform,
    private modalController: ModalController
  ) { }


  segmentChanged({detail:{value}}): void{
    this.selected = Number(value);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.chargePokemonInfoTrigger.next(this.statusComponent);
      event.target.complete();
    }, 500);
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

  getPokemonTypes(pokemon: Pokemon): Common[] {
    const { types = null } = pokemon || {};
    return (types || [])?.map(item => {
      const { type = null } = item || {};
      const { name = null, url = null  } = type
      return { name, url }
    });
  }

  // SHOW SINGLE CARD
  async openPokemonModal(pokemon: PokemonList) {
    await this.commonOpenModal('pokemon', pokemon, PokemonModalComponent);
  }

  // SHOW SINGLE CARD
  async openMovedModal(move: Common) {
    await this.commonOpenModal('move', move, MoveModalComponent);
  }

  // SHOW SINGLE CARD
  async openTypeModal(type: Common) {
    await this.commonOpenModal('type', type, TypeModalComponent);
  }

  // SHOW SINGLE CARD
  async openAbilityModal(ability: Common) {
    await this.commonOpenModal('ability', ability, AbilityModalComponent);
  }

  async commonOpenModal(paramsKey: string, params: Common, component: any) {
    this.dismiss();
    const modal = await this.modalController.create({
      component,
      componentProps:{
        [paramsKey]:params
      }
    });
    return await modal.present();
  }


}
