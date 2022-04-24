import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NotificationActions } from '@newPokeData/shared/notification';
import { EntityStatus } from '@newPokeData/shared/utils/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PokedexActions from '../actions/pokedex.actions';
import { PokedexService } from '../services/pokedex.service';


@Injectable()
export class PokedexEffects implements OnInitEffects {

  loadPokedex$ = createEffect( () =>
    this.actions$.pipe(
      ofType(PokedexActions.loadPokedex),
      switchMap( () =>
        this._pokedex.getPokedex().pipe(
          map(({pokedex, count}) => PokedexActions.savePokedex({ pokedex, count, error:undefined, status: EntityStatus.Loaded})),
          catchError( (error) => {
            return of(
              PokedexActions.savePokedex({ pokedex: [], count:0, error, status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEDEX'})
            )
          })
        )
      )
    )
  );


  ngrxOnInitEffects() {
    return PokedexActions.loadPokedex()
  };


  constructor(
    private actions$: Actions,
    private _pokedex: PokedexService,
    public toastController: ToastController,
  ){ }


}
