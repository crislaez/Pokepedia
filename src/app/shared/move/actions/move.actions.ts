import { Common, EntityStatus } from '@newPokeData/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Move } from '../models';


export const loadMovesList = createAction(
  '[Move] Load Moves List'
);

export const saveMovesList = createAction(
  '[Move] Save Moves List',
  props<{movesList: Common[], error:unknown, count:number, status: EntityStatus}>()
);


export const loadMove = createAction(
  '[Move] Load Move',
  props<{id: string}>()
);

export const saveMove = createAction(
  '[Move] Save Move',
  props<{move: Move, error:unknown, status: EntityStatus}>()
);
