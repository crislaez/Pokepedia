import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Type } from '@newPokeData/shared/type';
import { clearName, getClassColor, trackById } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';


@Component({
  selector: 'app-about',
  template:`
  <div>
    <ion-card *ngFor="let key of damageRelationKeys; trackBy: trackById">
      <div class="card-container span-bold">
        <ion-label class="text-color-dark capital-letter">{{ clearName(key) }}</ion-label>
      </div>

      <div class="card-container text-color-dark margin-top">
        <ng-container *ngIf="type?.damage_relations?.[key]?.length > 0 ; else noItem">
          <ion-chip
            class="text-color-light"
            *ngFor="let item of type?.damage_relations?.[key]; trackBy: trackById"
            (click)="openTypeModal.next(item)"
            [ngClass]="getClassColor(item?.name)">
            <ion-label>
              {{ item?.name }}
            </ion-label>
          </ion-chip>
        </ng-container>

      </div>
    </ion-card>
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
  clearName = clearName;
  getClassColor = getClassColor;
  @Input() type: Type;
  @Output() openTypeModal = new EventEmitter<Common>();


  constructor() { }


  get damageRelationKeys(): string[]{
    return Object.keys(this.type?.damage_relations || {})
  }

}
