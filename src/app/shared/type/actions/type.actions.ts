import { Common, EntityStatus } from '@newPokeData/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Type } from '../models';


export const loadTypesList = createAction(
  '[Type] Load Types List'
);

export const saveTypesList = createAction(
  '[Type] Save Types List',
  props<{typesList: Common[], error:unknown, count:number, status: EntityStatus}>()
);


export const loadType = createAction(
  '[Type] Load Type',
  props<{id: string}>()
);

export const saveType = createAction(
  '[Type] Save Type',
  props<{aType: Type, error:unknown, status: EntityStatus}>()
);
