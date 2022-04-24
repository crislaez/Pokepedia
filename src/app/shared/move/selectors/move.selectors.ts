import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMove from '../reducers/move.reducer';

export const selectMoveState = createFeatureSelector<fromMove.State>(
  fromMove.moveFeatureKey
);


export const selectMoveList = createSelector(
  selectMoveState,
  (state) => state?.movesList
);

export const selectMoveListStatus = createSelector(
  selectMoveState,
  (state) => state?.status
);

export const selectMoveListCount = createSelector(
  selectMoveState,
  (state) => state?.count
);

export const selectMoveListError = createSelector(
  selectMoveState,
  (state) => state?.error
);

export const selectMove = createSelector(
  selectMoveState,
  (state) => state?.move
);

export const selectMoveStatus = createSelector(
  selectMoveState,
  (state) => state?.moveStatus
);

export const selectMoveError = createSelector(
  selectMoveState,
  (state) => state?.moveError
);
