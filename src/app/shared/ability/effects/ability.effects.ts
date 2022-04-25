import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NotificationActions } from '@newPokeData/shared/notification';
import { EntityStatus } from '@newPokeData/shared/utils/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AbilityActions from '../actions/ability.actions';
import { AbilityService } from '../services/ability.service';


@Injectable()
export class AbilityEffects implements OnInitEffects {

  loadAbilitiesList$ = createEffect( () =>
    this.actions$.pipe(
      ofType(AbilityActions.loadAbilitiesList),
      switchMap( () =>
        this._ability.getAbilities().pipe(
          map( ({abilitiesList, count}) => AbilityActions.saveAbilitiesList({ abilitiesList, error: undefined, count, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              AbilityActions.saveAbilitiesList({ abilitiesList: [], error, count:0, status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_ABILIITIES'})
            )
          }),
        )
      )
    )
  );

  loadAbility$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AbilityActions.loadAbility),
      switchMap(({id}) => {
        return this._ability.getAbility(id).pipe(
          map(ability => AbilityActions.saveAbility({ability, status: EntityStatus.Loaded, error: undefined})),
          catchError((error) => {
            return of(
              AbilityActions.saveAbility({ability:{}, status: EntityStatus.Error, error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_ABILITY'})
            )
          })
        )
      })
    )
  });

  ngrxOnInitEffects() {
    return AbilityActions.loadAbilitiesList()
  };


  constructor(
    private actions$: Actions,
    private _ability: AbilityService,
    public toastController: ToastController,
  ){}


}
