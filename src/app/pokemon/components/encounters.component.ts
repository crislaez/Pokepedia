import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon } from '@newPokeData/shared/pokemon';
import { clearName, trackById } from '@newPokeData/shared/utils/helpers/functions';

@Component({
  selector: 'app-encounters',
  template:`
    <div class="displays-around" *ngIf="pokemon?.encounters?.length > 0; else noData">
      <ng-container *ngFor="let encounter of pokemon?.encounters; trackBy: trackById">

        <ion-card *ngFor="let gameVersion of encounter?.version_details; trackBy: trackById">
          <div class="margin-top-10"><ion-label class="capital-letter text-color-dark span-bold"><span class="text-color-dark">{{ 'COMMON.VERSION' | translate }}:</span> {{ clearName(gameVersion?.version?.name) }}</ion-label></div>
          <div class="margin-top"><ion-label class="capital-letter"><span class="text-color-dark">{{ 'COMMON.LOCATION' | translate }}:</span > {{ clearName(encounter?.location_area?.name) }}</ion-label></div>
          <div>
            <ng-container *ngFor="let detail of gameVersion?.encounter_details; trackBy: trackById">
              <div class="pokemon-method-wrapper">
                <div><span class="text-color-dark">{{ 'COMMON.METHOD' | translate }} :</span> {{ clearName(detail?.method?.name) }}</div>
                <div><span class="text-color-dark">{{ 'COMMON.MIN_LEVEL' | translate}} :</span> {{ detail?.min_level }}</div>
                <div><span class="text-color-dark">{{ 'COMMON.MAX_LEVEL' | translate}} :</span> {{ detail?.max_level }}</div>
              </div>
            </ng-container>
          </div>
        </ion-card>
      </ng-container>
    </div>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
    </ng-template>
  `,
  styleUrls: ['./encounters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EncountersComponent {

  clearName = clearName;
  trackById = trackById;
  @Input() pokemon: Pokemon;


  constructor() { }


}
