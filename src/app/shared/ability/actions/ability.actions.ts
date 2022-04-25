import { Common, EntityStatus } from '@newPokeData/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Ability } from '../models';


export const loadAbilitiesList = createAction(
  '[Ability] Load Abilities List'
);

export const saveAbilitiesList = createAction(
  '[Ability] Save Abilities List',
  props<{abilitiesList: Common[], error:unknown, count:number, status: EntityStatus}>()
);


export const loadAbility = createAction(
  '[Ability] Load Ability',
  props<{id: string}>()
);

export const saveAbility = createAction(
  '[Ability] Save Ability',
  props<{ability: Ability, error:unknown, status: EntityStatus}>()
);
