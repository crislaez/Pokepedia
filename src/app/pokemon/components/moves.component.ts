import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '@newPokeData/shared/pokemon';
import { clearName, trackById, getClassColorType } from '@newPokeData/shared/utils/helpers/functions';
import { Common } from '@newPokeData/shared/utils/models';

@Component({
  selector: 'app-moves',
  template:`
    <div *ngIf="pokemon?.moves?.length > 0; else noData">
      <ion-card *ngFor="let move of pokemon?.moves; trackBy: trackById">

        <div class="move-div-title">
          <!-- [routerLink]="['move/'+move?.move?.name]" -->
          <ion-button [ngClass]="getClassColorType(pokemon)" (click)="openMovedModal.next(move?.move)" class="capital-letter">{{ clearName(move?.move?.name) }}</ion-button>
        </div>

        <div class="move-div-wrapper displays-around">
          <div class="move-div" *ngFor="let moveAtLevel of move?.version_group_details; trackBy: trackById">
            <div class="capital-letter"><span class="span-dark">{{ 'COMMON.VERSION' | translate }}:</span> {{clearName(moveAtLevel?.version_group?.name)}}</div>
            <div><span class="span-dark">{{ 'COMMON.LEVEL' | translate}}:</span> {{moveAtLevel?.level_learned_at}}</div>
            <div><span class="span-dark">{{ 'COMMON.METHOD' | translate}}:</span> {{clearName(moveAtLevel?.move_learn_method?.name)}}</div>
          </div>
        </div>

      </ion-card>
    </div>

    <!-- IS NO DATA  -->
    <ng-template #noData>
      <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'30vh'"></app-no-data>
    </ng-template>
  `,
  styleUrls: ['./moves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovesComponent {

  trackById = trackById;
  clearName = clearName;
  getClassColorType = getClassColorType;
  @Input() pokemon: Pokemon;
  @Output() openMovedModal = new EventEmitter<Common>();

  constructor() { }

}
