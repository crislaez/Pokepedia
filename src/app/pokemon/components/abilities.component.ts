import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@newPokeData/shared/pokemon';
import { clearName, trackById, getClassColorType } from '@newPokeData/shared/utils/helpers/functions';

@Component({
  selector: 'app-abilities',
  template:`
    <div *ngIf="pokemon?.abilities?.length > 0; else noData">
      <ion-card class="info-wrapper">
        <div *ngFor="let ability of pokemon?.abilities; trackBy: trackById" class="displays-around-center">
          <!-- [routerLink]="['move/'+move?.move?.name]" -->
          <ion-button [ngClass]="getClassColorType(pokemon)" class="capital-letter">{{ clearName(ability?.ability?.name) }}</ion-button>
          <div><span class="text-color-dark">{{ 'COMMON.HIDE' | translate }}:</span><span>{{ (ability?.is_hidden ? 'COMMON.YES' : 'COMMON.NO') | translate }}</span> </div>
        </div>

      </ion-card>
    </div>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
    </ng-template>
  `,
  styleUrls: ['./abilities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilitiesComponent {

  clearName = clearName;
  trackById = trackById;
  getClassColorType = getClassColorType;
  @Input() pokemon: Pokemon;


  constructor() { }


}
