import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { clearName, errorImage, getCardrBackground, getClassColor, getPokedexNumber, getPrincipalImage, sliceText, trackById } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';

@Component({
  selector: 'app-item-card',
  template:`
  <div class="displays-around">
    <ion-card
      *ngFor="let item of moveList; let i = index; trackBy: trackById"
      class="ion-activatable ripple-parent fade-in-image"
      [ngClass]="getClass(i, item?.name)"

      (click)="opendModal.next(item)">

      <div class="ion-card-pokeball">
        <div class="ion-card-pokeball-circle" [ngClass]="getCardrBackground(i)"></div>
      </div>

      <div class="displays-center" >
        <div class="span-text capital-letter text-color-light">{{ sliceText(clearName(item?.name)) }}</div>
      </div>

      <!-- RIPPLE EFFECT -->
      <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
  </div>
  `,
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {

  trackById = trackById;
  clearName = clearName;
  sliceText = sliceText;
  errorImage = errorImage;
  getClassColor = getClassColor;
  getPokedexNumber = getPokedexNumber;
  getPrincipalImage = getPrincipalImage;
  getCardrBackground = getCardrBackground;
  @Input() moveList: Common[];
  @Input() isType: boolean = false;
  @Output() opendModal = new EventEmitter<Common>();


  constructor() { }


  getClass(index:number, name:string): string{
    return !this.isType ? getCardrBackground(index) : getClassColor(name)
  }


}
