import { EntityStatus } from '@newPokeData/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as MoveActions from '../actions/move.actions';
import { Move } from '../models';
import { Common } from './../../utils/models/index';

export const moveFeatureKey = 'move';

export interface State{
  movesList?: Common[];
  status?: EntityStatus;
  error?: unknown;
  count?:number;

  move?: Move;
  moveStatus?: EntityStatus;
  moveError?: unknown;
}

const initialState: State = {
  movesList: [],
  status: EntityStatus.Initial,
  error:undefined,
  count:0,

  move: {},
  moveStatus: EntityStatus.Initial,
  moveError:undefined
}


export const reducer = createReducer(
  initialState,
  on(MoveActions.loadMovesList, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(MoveActions.saveMovesList, (state, { movesList, error, count, status }) => ({...state, movesList, count, error, status })),

  on(MoveActions.loadMove, (state) => ({ ...state, moveError: undefined,  moveStatus: EntityStatus.Pending })),
  on(MoveActions.saveMove, (state, { move, error, status }) => ({...state, move, moveError: error, moveStatus: status })),
);

