import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { MoveEffects } from './effects/move.effects';
import * as fromMove from './reducers/move.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromMove.moveFeatureKey, fromMove.reducer),
    EffectsModule.forFeature([MoveEffects]),
  ]
})
export class MoveModule { }
