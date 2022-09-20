import { Common } from '@newPokeData/shared/utils/models';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonList, Pokemons } from '@newPokeData/shared/pokemon/models';
import { clearName, errorImage, getCardrBackground, getPokedexNumber, getClassColor, getPrincipalImage, sliceSmallText, trackById } from '@newPokeData/shared/utils/helpers/functions';

@Component({
  selector: 'app-pokemon-card',
  template:`
  <div class="displays-around">
    <ion-card class="ion-activatable ripple-parent fade-in-image" *ngFor="let pokemon of pokemonList; let i = index; trackBy: trackById" (click)="openPokemondModal.next(pokemon)" [ngClass]="getClass(pokemon?.types, i)">
      <div class="ion-card-pokeball">
        <div class="ion-card-pokeball-circle" [ngClass]="getCardrBackground(i)"></div>
      </div>

      <div class="pokemon-item displays-around" >
        <div class="pokemon-item-title displays-center" >
          <div class="span-text text-color-light"><span class="span-bold">#{{getPokedexNumber(pokemon?.url)}}  {{sliceSmallText(clearName(pokemon?.name))}}</span></div>
        </div>

        <div class="pokemon-item-types">
          <ion-chip *ngFor="let type of pokemon?.types; trackBy: trackById" [ngClass]="getClassColor(type?.name)">
            <ion-label class="text-color-light">{{ type?.name }}</ion-label>
          </ion-chip>
        </div>

        <div class="pokemon-item-avatar">
          <ion-avatar slot="start">
            <img loading="lazy" [src]="getPrincipalImage(pokemon?.url)" [alt]="pokemon?.name" (error)="errorImage($event)">
          </ion-avatar>
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
  getClassColor = getClassColor;
  sliceSmallText = sliceSmallText;
  errorImage = errorImage;
  getPokedexNumber = getPokedexNumber;
  getPrincipalImage = getPrincipalImage;
  getCardrBackground = getCardrBackground;
  @Input() pokemonList: Pokemons[];
  @Output() openPokemondModal = new EventEmitter<PokemonList>();

  constructor() { }


  getClass(types: Common[] = [], index: number): string{
    const [type = null ] = types || [];
    return  type ? this.getClassColor(type?.name) : this.getCardrBackground(index)
  }


}
