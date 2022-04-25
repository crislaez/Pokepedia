import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { AbilityEffects } from './effects/ability.effects';
import * as fromAbility from './reducers/ability.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromAbility.abilityFeatureKey, fromAbility.reducer),
    EffectsModule.forFeature([AbilityEffects]),
  ]
})
export class AbilityModule { }
