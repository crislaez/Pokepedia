import { EntityStatus } from '@newPokeData/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as AbilityActions from '../actions/ability.actions';
import { Ability } from '../models';
import { Common } from './../../utils/models/index';

export const abilityFeatureKey = 'ability';

export interface State{
  abilitiesList?: Common[];
  status?: EntityStatus;
  error?: unknown;
  count?:number;

  ability?: Ability;
  abilityStatus?: EntityStatus;
  abilityError?: unknown;
}

const initialState: State = {
  abilitiesList: [],
  status: EntityStatus.Initial,
  error:undefined,
  count:0,

  ability: {},
  abilityStatus: EntityStatus.Initial,
  abilityError:undefined
}


export const reducer = createReducer(
  initialState,
  on(AbilityActions.loadAbilitiesList, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(AbilityActions.saveAbilitiesList, (state, { abilitiesList, error, count, status }) => ({...state, abilitiesList, count, error, status })),

  on(AbilityActions.loadAbility, (state) => ({ ...state, abilityError: undefined,  abilityStatus: EntityStatus.Pending })),
  on(AbilityActions.saveAbility, (state, { ability, error, status }) => ({...state, ability, abilityError: error, abilityStatus: status })),
);

