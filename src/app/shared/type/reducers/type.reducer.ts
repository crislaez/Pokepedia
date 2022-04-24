import { EntityStatus } from '@newPokeData/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as TypeActions from '../actions/type.actions';
import { Type } from '../models';
import { Common } from './../../utils/models/index';

export const typeFeatureKey = 'type';

export interface State{
  typesList?: Common[];
  status?: EntityStatus;
  error?: unknown;
  count?:number;

  aType?: Type;
  typeStatus?: EntityStatus;
  typeError?: unknown;
}

const initialState: State = {
  typesList: [],
  status: EntityStatus.Initial,
  error:undefined,
  count:0,

  aType: {},
  typeStatus: EntityStatus.Initial,
  typeError:undefined
}


export const reducer = createReducer(
  initialState,
  on(TypeActions.loadTypesList, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(TypeActions.saveTypesList, (state, { typesList, error, count, status }) => ({...state, typesList, count, error, status })),

  on(TypeActions.loadType, (state) => ({ ...state, typeError: undefined,  typeStatus: EntityStatus.Pending })),
  on(TypeActions.saveType, (state, { aType, error, status }) => ({...state, aType, typeError: error, typeStatus: status })),
);

