import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NotificationActions } from '@newPokeData/shared/notification';
import { EntityStatus } from '@newPokeData/shared/utils/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TypeActions from '../actions/type.actions';
import { TypeService } from '../services/type.service';


@Injectable()
export class TypeEffects implements OnInitEffects {

  loadTypesList$ = createEffect( () =>
    this.actions$.pipe(
      ofType(TypeActions.loadTypesList),
      switchMap( () =>
        this._type.getMoves().pipe(
          map( ({typesList, count}) => TypeActions.saveTypesList({ typesList, error: undefined, count, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              TypeActions.saveTypesList({ typesList: [], error, count:0, status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TYPES'})
            )
          }),
        )
      )
    )
  );

  loadType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TypeActions.loadType),
      switchMap(({id}) => {
        return this._type.getMove(id).pipe(
          map(aType => TypeActions.saveType({aType, status: EntityStatus.Loaded, error: undefined})),
          catchError((error) => {
            return of(
              TypeActions.saveType({aType:{}, status: EntityStatus.Error, error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TYPE'})
            )
          })
        )
      })
    )
  });

  ngrxOnInitEffects() {
    return TypeActions.loadTypesList()
  };


  constructor(
    private actions$: Actions,
    private _type: TypeService,
    public toastController: ToastController,
  ){}


}
