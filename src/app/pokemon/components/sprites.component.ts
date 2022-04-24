import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@newPokeData/shared/pokemon';
import { errorImage, clearName, trackById } from '@newPokeData/shared/utils/helpers/functions';

@Component({
  selector: 'app-sprites',
  template:`
    <div *ngIf="generationsKeys?.length > 0; else noData">
      <!-- OTHER  -->
      <ng-container *ngFor="let other of otherVersionsKeys; trackBy: trackById">
        <ion-card *ngIf="existPokemonInGeneration(pokemon.sprites?.other?.[other])">
          <div class="displays-center margin-top-10 width-max">
            <ion-label class="capital-letter span-bold text-color-dark">{{'COMMON.POKEMON_TITLE' | translate }}: {{ clearName(other) }}</ion-label>
          </div>
          <ng-container *ngFor="let sprite of spriteFields">
            <img *ngIf="pokemon.sprites?.other?.[other]?.[sprite] as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event)">
          </ng-container>
        </ion-card>
      </ng-container>

      <!-- GENERATION  -->
      <ng-container *ngFor="let generation of generationsKeys; trackBy: trackById">
        <ng-container *ngFor="let game of pokemonGameVersion(pokemon.sprites?.versions?.[generation]); trackBy: trackById">
          <ion-card *ngIf="existPokemonInGeneration(pokemon.sprites?.versions?.[generation]?.[game])">
            <div class="displays-center margin-top-10 width-max">
              <ion-label class="capital-letter span-bold text-color-dark">{{'COMMON.POKEMON_TITLE' | translate }}: {{ clearName(game) }}</ion-label>
            </div>
            <ng-container *ngFor="let sprite of spriteFields">
            <img *ngIf="pokemon.sprites?.versions?.[generation]?.[game]?.[sprite] as image" class="card-pokemon-image" [src]="image" [alt]="image" (error)="errorImage($event)">
            </ng-container>
          </ion-card>
        </ng-container>
      </ng-container>
    </div>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
    </ng-template>
  `,
  styleUrls: ['./sprites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpritesComponent {

  trackById = trackById;
  errorImage = errorImage;
  clearName = clearName;
  @Input() pokemon: Pokemon;
  spriteFields = ['back_default','back_female','back_shiny','back_shiny_female','front_default','front_female','front_shiny','front_shiny_female'];


  constructor() { }


  get generationsKeys(): string[]{
    return Object.keys(this.pokemon.sprites?.versions || {});
  }

  get otherVersionsKeys(): string[]{
    return Object.keys(this.pokemon.sprites?.other || {});
  }

  pokemonGameVersion(generation: string): string[]{
    return Object.keys(generation || {});
  }

  existPokemonInGeneration(generation): boolean {
    return Object.values(generation || {})?.some(item => !!item)
  }


}
