import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromType from '../reducers/type.reducer';

export const selectTypeState = createFeatureSelector<fromType.State>(
  fromType.typeFeatureKey
);


export const selectTypeList = createSelector(
  selectTypeState,
  (state) => state?.typesList
);

export const selectTypeListStatus = createSelector(
  selectTypeState,
  (state) => state?.status
);

export const selectTypeListCount = createSelector(
  selectTypeState,
  (state) => state?.count
);

export const selectTypeListError = createSelector(
  selectTypeState,
  (state) => state?.error
);

export const selectType = createSelector(
  selectTypeState,
  (state) => state?.aType
);

export const selectTypeStatus = createSelector(
  selectTypeState,
  (state) => state?.typeStatus
);

export const selectTypeError = createSelector(
  selectTypeState,
  (state) => state?.typeError
);
