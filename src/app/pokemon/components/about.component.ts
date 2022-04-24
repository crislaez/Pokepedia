import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonList } from '@newPokeData/shared/pokemon';
import { errorImage, getClassColorType, getPrincipalImage, trackById, clearName } from '@newPokeData/shared/utils/helpers/functions';


@Component({
  selector: 'app-about',
  template:`
    <div>
      <ion-card class="info-wrapper">
        <ion-label class="text-color-dark">{{ description }}</ion-label>
      </ion-card>

      <ion-card>
        <div class="info-wrapper span-bold">
          <ion-label class="text-color-dark">{{ 'COMMON.BREEDING' | translate }}</ion-label>
        </div>

        <div class="info-wrapper text-color-dark">
          <div class="info-wrapper-div"><div>{{ 'COMMON.BASE_EXPERIENCE' | translate }}:</div> <div class="text-color-dark-light">{{ pokemon?.base_experience }}</div></div>
          <div class="info-wrapper-div"><div>{{ 'COMMON.HEIGHT' | translate }}:</div> <div class="text-color-dark-light">{{ meterFormatter(pokemon?.height) }}</div></div>
          <div class="info-wrapper-div"><div>{{ 'COMMON.WEIGHT' | translate }}:</div> <div class="text-color-dark-light">{{ klFormatter(pokemon?.weight) }}</div></div>
          <div class="info-wrapper-div"><div>{{ 'COMMON.EGG_GROUP' | translate }}:</div> <div class="text-color-dark-light">{{ eggGroups }}</div></div>
          <div class="info-wrapper-div" *ngIf="pokemon?.habitat?.name as habitatName"><div>{{ 'COMMON.HABITAT' | translate }}:</div> <div class="text-color-dark-light">{{ habitatName }}</div></div>
        </div>
      </ion-card >

      <ion-card>
        <div class="info-wrapper span-bold">
          <ion-label class="text-color-dark">{{ 'COMMON.BASE_STATS' | translate }}</ion-label>
        </div>

        <div class="info-wrapper text-color-dark">
          <!-- <div class="displays-around">
            <ion-button [ngClass]="getClassColorType(pokemon)" (click)="section = 1">{{ 'COMMON.BASE_STATS' | translate }}</ion-button>
            <ion-button [ngClass]="getClassColorType(pokemon)"  (click)="section = 2">{{ 'COMMON.MAX_STATS' | translate }}</ion-button>
          </div> -->

          <div class="info-wrapper-div-stats" *ngFor="let stat of statdata; trackBy: trackById">
            <div>{{ stat?.label | translate }}:</div>
            <div class="text-color-dark-light">
              {{
                section === 2
                ? ( stat?.field !== 'hp' ? maximunsStats(baseStats?.[stat?.field] )
                : maximunsStatsPs(baseStats?.[stat?.field]) ) : baseStats?.[stat?.field]
              }}
            </div>
            <div class="progress-bar">
              <div class="progress-bar__fill" [ngStyle]="{'width': 'calc('+getStatistic(baseStats?.[stat?.field])+'%)', 'background':getStatisticColor(baseStats?.[stat?.field]) }"></div>
            </div>
          </div>

          <div class="info-wrapper-div-stats">
            <div>{{ 'COMMON.TOTAL' | translate }}:</div>
            <div class="text-color-dark-light">{{ total }}</div>
          </div>
        </div>
      </ion-card >

      <ion-card *ngIf="pokemon?.varieties?.length > 1">
        <div class="info-wrapper span-bold">
          <ion-label class="text-color-dark">{{ 'COMMON.ALTERNATIVES_FORM' | translate }}</ion-label>
        </div>

        <div class="displays-around">
          <ng-container *ngFor="let variety of pokemon?.varieties; trackBy: trackById">
            <div (click)="openPokemonModal.next(variety?.pokemon)">
              <ion-avatar slot="start">
                <img loading="lazy" [src]="getPrincipalImage(variety?.pokemon?.url)" [alt]="getPrincipalImage(variety?.pokemon?.url)" (error)="errorImage($event)">
              </ion-avatar>
              <div class="margin-top-10">
                <ion-label class="capital-letter span-dark">
                  {{clearName(variety?.pokemon?.name)}}
                </ion-label>
              </div>
            </div>
          </ng-container>
        </div>
      </ion-card >
    </div>
  `,
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {

  trackById = trackById;
  clearName = clearName;
  errorImage = errorImage;
  getPrincipalImage = getPrincipalImage;
  getClassColorType = getClassColorType;
  @Input() pokemon: Pokemon;
  @Output() openPokemonModal = new EventEmitter<PokemonList>();

  section = 1;
  statdata = [
    {id:1, label:'COMMON.HP', field:'hp'},
    {id:2, label:'COMMON.ATTACK', field:'attack'},
    {id:3, label:'COMMON.DEFENSE', field:'defense'},
    {id:4, label:'COMMON.SPECIAL_ATTACK', field:'specialAttack'},
    {id:5, label:'COMMON.SPECIAL_DEFENSE', field:'specialDefense'},
    {id:6, label:'COMMON.SPEED', field:'speed'},
  ];

  constructor() { }


  meterFormatter(num) {
    return (num * 0.1).toFixed(1) + 'm / ' + ((num * 0.1) * 3.28084).toFixed(2) +' "'
  }

  klFormatter(num) {
    return (num * 0.1).toFixed(1) + 'kg / ' + ((num * 0.1) * 2.20462).toFixed(2) +' lib'
  }

  get description(){
    return this.pokemon?.flavor_text_entries?.find(({language}) => language?.name === 'en')?.flavor_text ||''
  }

  get eggGroups(){
    return (this.pokemon?.egg_groups || [])?.map(({name}) => (name))?.join(', ')
  }

  get baseStats(){
    const [ hp = null, attack = null, defense = null, specialAttack = null, specialDefense = null, speed = null, ] = this.pokemon?.stats || [];

    return {
      hp: hp?.base_stat,
      attack: attack?.base_stat,
      defense: defense?.base_stat,
      specialAttack: specialAttack?.base_stat,
      specialDefense: specialDefense?.base_stat,
      speed: speed?.base_stat
    };
  }

  get total(){
    return ((Object.values(this.baseStats || {}) || [])?.reduce((acc, el) => (acc + el), 0));
  }

  maximunsStats(stast: number): number {
    let result = ((stast * 2 + 99) * 1.1)
    return parseInt(result.toFixed(0)) -1
  }

  maximunsStatsPs(stast: number): number {
    let result = (stast * 2 + 204)
    return parseInt(result.toFixed(0))
  }

  getStatistic(stat: number): number{
    return 100 * (stat / 257);
  }

  getStatisticColor(stat:number): string{
    return stat >= 100
    ? '#9CE789'
    : stat < 100 && stat > 65
    ? '#FFAC70'
    : stat <= 65
    ? '#FF7070'
    : '#FF7070';
  }


}
