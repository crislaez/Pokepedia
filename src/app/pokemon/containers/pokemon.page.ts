import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { FilterModalComponent } from '@newPokeData/shared-ui/generics/components/filter-modal.component';
import { fromPokedex } from '@newPokeData/shared/pokedex';
import { fromPokemon, PokemonActions } from '@newPokeData/shared/pokemon';
import { PokemonList } from '@newPokeData/shared/pokemon/models';
import { clearName, getPokemonId, gotToTop } from '@newPokeData/shared/utils/helpers/functions';
import { Store } from '@ngrx/store';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { PokemonModalComponent } from '../containers/pokemon-modal.component';


@Component({
  selector: 'app-pokemon',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-color components-background-primary">
      <!-- FORM  -->
      <div class="search-wrapper displays-center">
        <ng-container  *ngIf="!['pending', 'error'].includes((status$ | async))">
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>

          <ng-container *ngIf="(pokedex$ | async) as pokedex">
            <ion-button class="class-ion-button" (click)="presentModal(pokedex)"><ion-icon name="options-outline"></ion-icon></ion-button>
          </ng-container>
        </ng-container>
      </div>
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="info?.pokemonList.length > 0; else noData">

                <app-pokemon-card
                  [pokemonList]="info?.pokemonList"
                  (openPokemondModal)="openPokemondModal($event)">
                </app-pokemon-card>

                <!-- INFINITE SCROLL  -->
                <app-infinite-scroll
                  [slice]="componentStatus?.slice"
                  [total]="info?.total"
                  [status]="status"
                  (loadDataTrigger)="loadData($event)">
                </app-infinite-scroll>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'30vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <app-spinner [top]="'75%'"></app-spinner>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./pokemon.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonPage {

  gotToTop = gotToTop;
  clearName = clearName;
  getPokemonId = getPokemonId;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  search = new FormControl('');

  infiniteScrollTrigger = new EventEmitter<{pokedexNumber:string, slice:number, search?:string}>();
  componentStatus:{pokedexNumber:string, slice:number, search?:string } = {
    pokedexNumber:'0',
    slice:20
  };

  status$ = this.store.select(fromPokemon.selectPokemonsListStatus).pipe(shareReplay(1));
  pokedex$ = this.store.select(fromPokedex.selectPokedex);

  info$ = this.infiniteScrollTrigger.pipe(
    startWith(this.componentStatus),
    switchMap(({slice, search}) =>
      this.store.select(fromPokemon.selectPokemonsList).pipe(
        map(pokemonList => {

          const pokemonListFilter = search
              ? (pokemonList || [])?.filter(({name}) => name?.toLowerCase()?.includes(search?.toLowerCase()))
              : [...pokemonList];

          return{
            pokemonList: pokemonListFilter?.slice(0, slice),
            total: pokemonListFilter?.length
          }
        })
      )
    )
  );

  constructor(
    private store: Store,
    public platform: Platform,
    public modalController: ModalController,
  ) {
    this.store.dispatch(PokemonActions.loadPokemonList({pokedexNumber:'0'}))
  }


  // SEARCH
  searchSubmit(event: Event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.componentStatus = { ...this.componentStatus, slice:20, search: this.search.value };
    this.infiniteScrollTrigger.next(this.componentStatus);
  }

  // CLEAR
  clearSearch(event): void{
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    this.search.reset();
    this.componentStatus = { ...this.componentStatus, slice:20, search: '' };
    this.infiniteScrollTrigger.next(this.componentStatus);
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.search.reset();
      this.componentStatus = {...this.componentStatus, slice:20, search:''};
      this.infiniteScrollTrigger.next(this.componentStatus);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}) {
    this.componentStatus = {...this.componentStatus, slice: this.componentStatus.slice + 20};
    this.infiniteScrollTrigger.next(this.componentStatus);
    event.target.complete();
  }

  // SHOW SINGLE CARD
  async openPokemondModal(pokemon: PokemonList) {
    const modal = await this.modalController.create({
      component: PokemonModalComponent,
      componentProps:{
        pokemon
      }
    });
    return await modal.present();
  }

  // OPEN FILTER MODAL
  async presentModal(pokedex) {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        componentStatus: this.componentStatus,
        pokedex,
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.4, //modal height
    });

    modal.onDidDismiss()
      .then((res) => {
        const { data } = res || {};
        if(!!data){
          this.componentStatus = { ...data }
          // this.infiniteScrollTrigger.next(this.componentStatus)
          this.store.dispatch(PokemonActions.loadPokemonList({pokedexNumber: this.componentStatus.pokedexNumber}))
        }
    });

    return await modal.present();
  }

  // SCROLL EVENT
  logScrolling({detail:{scrollTop}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
