import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from '../reducers/pokemon.reducer';

export const selectPokemonState = createFeatureSelector<fromPokemon.State>(
  fromPokemon.pokemonFeatureKey
);


export const selectPokemonsList = createSelector(
  selectPokemonState,
  (state) => state?.pokemonList
);

export const selectPokemonsListStatus = createSelector(
  selectPokemonState,
  (state) => state?.status
);

export const selectPokedexNumber = createSelector(
  selectPokemonState,
  (state) => state?.pokedexNumber
);

export const selectPokemonsListCount = createSelector(
  selectPokemonState,
  (state) => state?.count
);

export const selectPokemonsListError = createSelector(
  selectPokemonState,
  (state) => state?.error
);

export const selectPokemon = createSelector(
  selectPokemonState,
  (state) => state?.pokemon
);

export const selectPokemonStatus = createSelector(
  selectPokemonState,
  (state) => state?.pokemonStatus
);

export const selectPokemonError = createSelector(
  selectPokemonState,
  (state) => state?.pokemonError
);
