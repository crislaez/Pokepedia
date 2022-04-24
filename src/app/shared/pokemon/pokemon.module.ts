import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { PokemonEffects } from './effects/pokemon.effects';
import * as fromPokemon from './reducers/pokemon.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromPokemon.pokemonFeatureKey, fromPokemon.reducer),
    EffectsModule.forFeature([PokemonEffects]),
  ]
})
export class PokemonModule { }
