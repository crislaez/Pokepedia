import { Common, EntityStatus } from '@newPokeData/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as PokedexActions from '../actions/pokedex.actions';

export const pokedexFeatureKey = 'pokedex';

export interface State{
  pokedex?: Common[];
  status?: EntityStatus;
  count?: number;
  error?: unknown;
}

const initialState: State = {
  pokedex: [],
  status: EntityStatus.Initial,
  count: 0,
  error:undefined
}


export const reducer = createReducer(
  initialState,
  on(PokedexActions.loadPokedex, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PokedexActions.savePokedex, (state, { pokedex, count, error, status }) => ({...state, pokedex, count, error, status })),
);

