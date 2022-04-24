import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonList } from '@newPokeData/shared/pokemon/models';
import { clearName, errorImage, getCardrBackground, getPokedexNumber, getPrincipalImage, sliceSmallText, trackById } from '@newPokeData/shared/utils/helpers/functions';

@Component({
  selector: 'app-pokemon-card',
  template:`
  <div class="displays-around">
    <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let pokemon of pokemonList; let i = index; trackBy: trackById" (click)="openPokemondModal.next(pokemon)" [ngClass]="getCardrBackground(i)">
      <div class="pokemon-item" >
        <ion-avatar slot="start">
          <img loading="lazy" [src]="getPrincipalImage(pokemon?.url)" [alt]="pokemon?.name" (error)="errorImage($event)">
        </ion-avatar>
        <div class="displays-center" >
          <div class="span-text text-color-light"><span class="span-bold">#{{getPokedexNumber(pokemon?.url)}}  {{sliceSmallText(clearName(pokemon?.name))}}</span></div>
        </div>
      </div>

      <!-- RIPPLE EFFECT -->
      <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
  </div>
  `,
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {

  trackById = trackById;
  clearName = clearName;
  sliceSmallText = sliceSmallText;
  errorImage = errorImage;
  getPokedexNumber = getPokedexNumber;
  getPrincipalImage = getPrincipalImage;
  getCardrBackground = getCardrBackground;
  @Input() pokemonList: PokemonList[];
  @Output() openPokemondModal = new EventEmitter<PokemonList>();

  constructor() { }


}
