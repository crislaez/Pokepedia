import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { fromMove } from '@newPokeData/shared/move';
import { gotToTop } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';
import { Store } from '@ngrx/store';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MoveModalComponent } from './move-modal.component';

@Component({
  selector: 'app-move',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-color components-background-primary">
      <!-- FORM  -->
      <div class="search-wrapper displays-center">
        <ng-container  *ngIf="!['pending', 'error'].includes((status$ | async))">
          <form (submit)="searchSubmit($event)">
            <ion-searchbar [placeholder]="'COMMON.BY_NAME' | translate" [formControl]="search" (ionClear)="clearSearch($event)"></ion-searchbar>
          </form>
        </ng-container>
      </div>
    </div>

    <div class="container components-background-dark">
      <ng-container *ngIf="(info$ | async) as info">
        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending'; else loader">
            <ng-container *ngIf="status !== 'error'; else serverError">
              <ng-container *ngIf="info?.moves?.length > 0; else noData">

                <app-item-card
                  [moveList]="info?.moves"
                  (opendModal)="openMoveModal($event)">
                </app-item-card>

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
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'12vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'12vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <app-spinner [top]="'15%'"></app-spinner>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./move.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovePage  {

  gotToTop = gotToTop;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  showButton: boolean = false;
  search = new FormControl('');

  status$ = this.store.select(fromMove.selectMoveListStatus)
  infiniteScrollTrigger = new EventEmitter<{slice:number, search?:string}>();
  componentStatus = {
    slice:20,
    search:''
  };

  info$ = this.infiniteScrollTrigger.pipe(
    startWith(this.componentStatus),
    switchMap(({slice, search}) =>
      this.store.select(fromMove.selectMoveList).pipe(
        map((moves) => {
          const pokemonListFilter = search
              ? moves?.filter(({name}) => name?.toLowerCase()?.includes(search?.toLowerCase()))
              : [...moves];

          return {
            moves: pokemonListFilter?.slice(0, slice),
            total: pokemonListFilter?.length
          }
        })
      )
    )
  );


  constructor(
    private store: Store,
    public platform: Platform,
    public modalController: ModalController
  ) { }


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
  async openMoveModal(move: Common) {
    const modal = await this.modalController.create({
      component: MoveModalComponent,
      componentProps:{
        move
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
