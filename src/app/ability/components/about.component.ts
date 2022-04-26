import { Ability } from '@newPokeData/shared/ability/models/index';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  template:`
  <div>
    <ion-card *ngIf="description">
      <div class="card-container span-bold">
        <ion-label class="text-color-dark">{{ 'COMMON.DESCRIPTION' | translate }}</ion-label>
      </div>

      <div class="card-container text-color-dark">
        <div  class="card-container-wrapper displays-between">
         {{ description }}
        </div>
      </div>
    </ion-card >

    <ion-card *ngIf="abilityEffects" >
      <div class="card-container span-bold">
        <ion-label class="text-color-dark">{{ 'COMMON.EFFECT' | translate }}</ion-label>
      </div>

      <div class="card-container text-color-dark">
        <div class="card-container-wrapper displays-between">
         {{ abilityEffects }}
        </div>
      </div>
    </ion-card >
  </div>

  <!-- IS NO DATA  -->
  <ng-template #noItem>
    <div> - </div>
  </ng-template>
  `,
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

  @Input() ability: Ability;


  constructor() { }


  get description(): any {
    return (this.ability.flavor_text_entries || [])?.find(({language:{name}}) => name === 'en')?.flavor_text
  }

  get abilityEffects():string {
    return (this.ability.effect_entries || [])?.find(({language:{name}}) => name === 'en')?.effect
  }



}
