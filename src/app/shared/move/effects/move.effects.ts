import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NotificationActions } from '@newPokeData/shared/notification';
import { EntityStatus } from '@newPokeData/shared/utils/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as MoveActions from '../actions/move.actions';
import { MoveService } from '../services/move.service';


@Injectable()
export class MoveEffects implements OnInitEffects {

  loadMovesList$ = createEffect( () =>
    this.actions$.pipe(
      ofType(MoveActions.loadMovesList),
      switchMap( () =>
        this._move.getMoves().pipe(
          map( ({movesList, count}) => MoveActions.saveMovesList({ movesList, error: undefined, count, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              MoveActions.saveMovesList({ movesList: [], error, count:0, status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOVES'})
            )
          }),
        )
      )
    )
  );

  loadMove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoveActions.loadMove),
      switchMap(({id}) => {
        return this._move.getMove(id).pipe(
          map(move => MoveActions.saveMove({move, status: EntityStatus.Loaded, error: undefined})),
          catchError((error) => {
            return of(
              MoveActions.saveMove({move:{}, status: EntityStatus.Error, error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_MOVE'})
            )
          })
        )
      })
    )
  });

  ngrxOnInitEffects() {
    return MoveActions.loadMovesList()
  };


  constructor(
    private actions$: Actions,
    private _move: MoveService,
    public toastController: ToastController,
  ){}


}
