import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { trackById } from '@newPokeData/shared/utils/helpers/functions';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template:`
  <ion-app>
    <!-- HEADER  -->
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-button fill="clear" size="small" slot="start" (click)="open()">
          <ion-menu-button class="text-color-light"></ion-menu-button>
        </ion-button>

        <ion-title *ngIf="(currentSection$ | async) as currentSection" class="text-color-light big-size" >
          {{ currentSection?.label | translate }}
        </ion-title>

        <div size="small" slot="end" class="div-clear"  >
        </div>
      </ion-toolbar>
    </ion-header>

    <!-- MENU LATERAL  -->
    <ion-menu side="start" menuId="first" contentId="main">
      <ion-header class="ion-no-border menu-header">
        <ion-toolbar >
          <ion-title class="text-color-light" >{{ 'COMMON.MENU' | translate}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content >
        <ion-item lines="none" class="text-color-dark" *ngFor="let item of links;  trackBy: trackById" [routerLink]="['/'+item?.link]" (click)="openEnd()">{{ item?.text | translate }}</ion-item>
      </ion-content >
    </ion-menu>

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

    <!-- TAB FOOTER  -->
    <!-- <ion-tabs *ngIf="currentSection$ | async as currentSection">
      <ion-tab-bar  [translucent]="true" slot="bottom">
        <ion-tab-button *ngFor="let item of links" [ngClass]="{'active-class': [item?.link]?.includes(currentSection?.route)}" class="text-color-light" [routerLink]="[item?.link]">
          <ion-icon [name]="item?.icon"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs> -->

  </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  trackById = trackById;
  currentSection$: Observable<{route:string, label:string}> = this.router.events.pipe(
    filter((event: any) => event instanceof NavigationStart),
    map((event: NavigationEnd) => {
      const { url = ''} = event || {}
      let route = url?.split('/')[1];
      if(route === 'pokemon') return {route, label:'COMMON.POKEMON'};
      if(route === 'move') return {route, label:'COMMON.MOVES_TITLE'};
      if(route === 'type') return {route, label:'COMMON.TYPES_TITLE'};
      if(route === 'ability') return {route, label:'COMMON.ABILITIES_TITLE'};
      return {route:route || 'home', label:'COMMON.POKEMON_TITLE'};
    })
  );

  links = [
    {id:1, link:'pokemon', text:'COMMON.POKEMON'},
    {id:2, link:'ability', text:'COMMON.ABILITIES_TITLE'},
    {id:3, link:'move', text:'COMMON.MOVES_TITLE'},
    {id:4, link:'type', text:'COMMON.TYPES_TITLE'}
  ];


  constructor(
    private menu: MenuController,
    private router: Router
  ) { }


  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.close();
  }

}
