import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAbility from '../reducers/ability.reducer';

export const selectAbilityState = createFeatureSelector<fromAbility.State>(
  fromAbility.abilityFeatureKey
);


export const selectAbilityList = createSelector(
  selectAbilityState,
  (state) => state?.abilitiesList
);

export const selectAbilityListStatus = createSelector(
  selectAbilityState,
  (state) => state?.status
);

export const selectAbilityListCount = createSelector(
  selectAbilityState,
  (state) => state?.count
);

export const selectAbilityListError = createSelector(
  selectAbilityState,
  (state) => state?.error
);

export const selectAbility = createSelector(
  selectAbilityState,
  (state) => state?.ability
);

export const selectAbilityStatus = createSelector(
  selectAbilityState,
  (state) => state?.abilityStatus
);

export const selectAbilityError = createSelector(
  selectAbilityState,
  (state) => state?.abilityError
);
