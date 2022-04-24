import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokedex from '../reducers/pokedex.reducer';

export const selectPokedexState = createFeatureSelector<fromPokedex.State>(
  fromPokedex.pokedexFeatureKey
);


export const selectPokedex = createSelector(
  selectPokedexState,
  (state) => state?.pokedex
);

export const selectStatus = createSelector(
  selectPokedexState,
  (state) => state?.status
);

export const selectCount = createSelector(
  selectPokedexState,
  (state) => state?.count
);

export const selectError = createSelector(
  selectPokedexState,
  (state) => state?.error
);

