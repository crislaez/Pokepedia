import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonList } from '@newPokeData/shared/pokemon';
import { clearName, errorImage, getPrincipalImage, trackById, getPokemonPokedexNumber } from '@newPokeData/shared/utils/helpers/functions';

@Component({
  selector: 'app-evolutions',
  template:`
    <div>
      <ion-card class="displays-around fade-in-image" *ngIf="checkToChainEvolutions(pokemon); else noData">
        <div *ngFor="let chain of getChainEvolution(pokemon?.species?.chain, []); trackBy: trackById" (click)="onOpenPokemonModal(chain)">
          <ion-avatar slot="start">
            <img loading="lazy" [src]="getPrincipalImage(chain?.url)" [alt]="getPrincipalImage(chain?.url)" (error)="errorImage($event)">
          </ion-avatar>

          <div class="margin-top-10">
            <ion-label class="capital-letter span-dark">
              {{clearName(chain?.species_name)}}
            </ion-label>
            <br>
            <ion-label>
              <span *ngIf="hasEvolution(chain?.evolution_metod)">{{ clearName(chain?.evolution_metod) }}</span>
            </ion-label>
          </div>

          <!-- RIPPLE EFFECT -->
          <ion-ripple-effect></ion-ripple-effect>
        </div>
      </ion-card>
    </div>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
    </ng-template>
  `,
  styleUrls: ['./evolutions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvolutionsComponent {

  trackById = trackById;
  clearName = clearName;
  errorImage = errorImage;
  getPrincipalImage = getPrincipalImage;
  getPokemonPokedexNumber = getPokemonPokedexNumber;
  @Input() pokemon: Pokemon;
  @Output() openPokemonModal = new EventEmitter<PokemonList>();


  constructor() { }


  checkToChainEvolutions(pokemon: any): boolean{
    if(pokemon?.species?.chain?.evolves_to?.length > 0) return true
    return false
  }

  getChainEvolution(chain, total): {species_name:string, evolution_metod:string, url:string}[] {
    const { name: species_name = null, url = null } = chain?.species || {};
    const [ details = null ] = chain?.evolution_details;
    const { trigger = null, item = null, min_level = null, min_happiness = null, location = null, known_move_type = null, held_item = null, time_of_day = null } = details || {};
    const { name: trigger_name = null } = trigger || {};
    const { name: itemName = null } = item || {};
    const { name: locationName = null } = location || {};
    const { name: knowMoveName = null } = known_move_type || {};
    const { name: heldItemName = null } = held_item || {};

    const method = min_level || itemName || (min_happiness ? `happinness ${min_happiness} ${( time_of_day ? `time of day: ${time_of_day}` : '')}` : '') || locationName || (knowMoveName ? `know move type ${knowMoveName}` : '') || heldItemName || time_of_day || null;

    total = [ ...(total ? total : []),
      {
        species_name,
        evolution_metod: (method ? `${trigger_name}: ${method}` : trigger_name),
        url
      }
    ];

    if(chain?.evolves_to?.length === 0){
      return total
    }

    let obj = {};

    return chain?.evolves_to?.reduce((acc, el) => {
      return [
        ...(acc ? acc : []),
        ...this.getChainEvolution(el, total)
      ]
    },[])?.filter(item => {
      const { species_name = null } = item || {}
      if(!obj[species_name]){
        obj[species_name] = true;
        return item
      }
    })
  }

  hasEvolution(text: string): boolean{
    return text?.split(' ')?.[0]?.includes('null') ? false : true;
  }

  onOpenPokemonModal(data): void{
    const { species_name:name = null, url = null } = data || {};
    const pokemonItem = {name, url}
    this.openPokemonModal.next(pokemonItem);
  }


}
