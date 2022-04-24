import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { PokedexEffects } from './effects/pokedex.effectd';
import * as fromPokedex from './reducers/pokedex.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromPokedex.pokedexFeatureKey, fromPokedex.reducer),
    EffectsModule.forFeature([PokedexEffects]),
  ]
})
export class PokedexModule { }
