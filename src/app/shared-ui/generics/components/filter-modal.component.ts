import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { clearName, getPokemonId } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';


@Component({
  selector: 'app-filter-modal',
  template:`
  <ion-content class="modal-wrapper components-color-second">
    <ion-header translucent class="ion-no-border  components-color-third">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button fill="clear" (click)="dismissModal()"><ion-icon name="close-outline"></ion-icon></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <div class="displays-around modal-container">
      <ion-item *ngIf="pokedex?.length > 0" class="item-select font-medium">
        <ion-label>{{'COMMON.POKEDEX' | translate}}</ion-label>
        <ion-select (ionChange)="changeFilter($any($event))" [value]="componentStatus?.pokedexNumber" interface="action-sheet">
          <ion-select-option value="0">{{'COMMON.EVERYONE' | translate}}</ion-select-option>
          <ion-select-option *ngFor="let format of pokedex" [value]="getPokemonId(format?.url)">{{ clearName(format?.name) }}</ion-select-option>
        </ion-select>
      </ion-item>
    </div>
  </ion-content>
  `,
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalComponent {

  clearName = clearName;
  getPokemonId = getPokemonId;
  @Input() pokedex: Common[];
  @Input() componentStatus: { lastPokedexNumber?:string, pokedexNumber:string };


  constructor(
    public modalController: ModalController
  ) { }


  dismissModal() {
    this.modalController.dismiss(false);
  }

  changeFilter({detail: {value}}): void{
    this.componentStatus = {
      ...this.componentStatus,
      lastPokedexNumber : this.componentStatus?.pokedexNumber,
      pokedexNumber:value,
    }
    this.modalController.dismiss(this.componentStatus);
  }

}
