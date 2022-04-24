import { Common, EntityStatus } from '@newPokeData/shared/utils/models';
import { createAction, props } from '@ngrx/store';


export const loadPokedex = createAction(
  '[Pokedex] Load Pokedex'
);

export const savePokedex = createAction(
  '[Pokedex] Save Pokedex',
  props<{pokedex: Common[], count: number, error:unknown, status: EntityStatus}>()
);

