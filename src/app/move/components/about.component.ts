
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Move } from '@newPokeData/shared/move';
import { getClassColor, trackById } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';

@Component({
  selector: 'app-about',
  template:`
  <div>
    <ion-card>
      <div class="card-container span-bold">
        <ion-label class="text-color-dark">{{ 'COMMON.BREEDING' | translate }}</ion-label>
      </div>

      <div class="card-container text-color-dark">
        <div class="card-container-wrapper displays-between">
          <div>{{ 'COMMON.TYPE_TITLE' | translate }}:</div>
          <div *ngIf="move?.type?.name; else noItem" class="text-color-dark-light" (click)="openTypeModal.next(move?.type)">
            <ion-chip [ngClass]="getClassColor(move?.type?.name)" >
              {{ move?.type?.name }}
            </ion-chip>
          </div>
        </div>

        <div
          class="card-container-wrapper displays-between"
          *ngFor="let item of getIterateItems(); trackBy: trackById">
          <div>{{ item?.label | translate }}:</div>
          <div *ngIf="item?.field; else noItem"  class="text-color-dark-light">{{ item?.field }}</div>
        </div>

        <div *ngIf="move?.stat_changes?.length > 0" class="card-container-wrapper displays-between">
          <div>{{ 'COMMON.STATS_CHANGE' | translate }}:</div>
          <div class="text-color-dark-light">{{ getStatsChanges(move?.stat_changes) }}</div>
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

  trackById = trackById;
  getClassColor = getClassColor;
  @Input() move: Move;
  @Output() openTypeModal = new EventEmitter<Common>();


  constructor() { }


  getIterateItems(): {id:number, label: string, field: string | number}[]{
    const { power = null, damage_class = null, pp = null, accuracy = null, priority = null, effect_chance = null } =  this.move || {};
    const { name = null } = damage_class || {};

    return [
      {id:1, label:'COMMON.POWER', field: power},
      {id:2, label:'COMMON.DAMAGE_CLASS', field:name},
      {id:3, label:'COMMON.PP', field:pp},
      {id:4, label:'COMMON.ACCURACY', field: accuracy},
      {id:5, label:'COMMON.PRIORITY', field: priority},
      {id:6, label:'COMMON.EFFECT_CHANGE', field: effect_chance},
    ];
  }

  getStatsChanges(stat_changes): string {
    return (stat_changes || [])?.map(({stat:{name}, change}) => (`${name} (${change})`))?.join(', ');
  }


}
