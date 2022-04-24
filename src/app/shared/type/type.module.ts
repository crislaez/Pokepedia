import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { TypeEffects } from './effects/type.effects';
import * as fromType from './reducers/type.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromType.typeFeatureKey, fromType.reducer),
    EffectsModule.forFeature([TypeEffects]),
  ]
})
export class TypeModule { }
