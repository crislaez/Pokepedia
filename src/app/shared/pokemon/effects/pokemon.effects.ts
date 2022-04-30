import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NotificationActions } from '@newPokeData/shared/notification';
import { getPokemonPokedexNumber } from '@newPokeData/shared/utils/helpers/functions';
import { EntityStatus } from '@newPokeData/shared/utils/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as PokemonActions from '../actions/pokemon.actions';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class PokemonEffects {

  loadPokemonList$ = createEffect( () =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonList),
      switchMap( ({pokedexNumber}) =>
        this._pokemon.getPokemons(pokedexNumber).pipe(
          map( ({pokemonList, count}) => PokemonActions.savePokemonList({ pokedexNumber, pokemonList, error: undefined, count, status: EntityStatus.Pending})), //Loaded
          catchError( (error) => {
            return of(
              PokemonActions.savePokemonList({pokedexNumber, pokemonList: [], error, count:0, status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEMON'})
            )
          }),
        )
      )
    )
  );

  loadPokemonsTypes$ = createEffect( () =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonsTypes),
      switchMap(({pokemonList, slice}) => {
        if(pokemonList?.length ===  0 || !pokemonList) return of(PokemonActions.savePokemonsTypes({pokemons:[], error: undefined, status: EntityStatus.Loaded, slice}));

        return forkJoin(
          (pokemonList?.slice((slice -20), slice))?.map(pokemon => {
            const id = getPokemonPokedexNumber(pokemon?.url)
            if(!id) return of(pokemon)
            return this._pokemon.getPokemonType(id).pipe(
              map(types => ({...pokemon, types})),
              catchError(() => of(pokemon))
            )
          })
        ).pipe(
          map(pokemons => PokemonActions.savePokemonsTypes({pokemons, error: undefined, status: EntityStatus.Loaded, slice})),
          catchError((error) => {
            return of(
              PokemonActions.savePokemonsTypes({pokemons:[], error, status: EntityStatus.Error, slice}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEMON'})
            )
          })
        )
      })
    )
  );

  loadPokemon$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemon),
      switchMap(({id}) => {
        return this._pokemon.getPokemon(id).pipe(
          map(pokemon => PokemonActions.savePokemon({pokemon, status: EntityStatus.Loaded, error: undefined})),
          catchError((error) => {
            return of(
              PokemonActions.savePokemon({pokemon:{}, status: EntityStatus.Error, error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_POKEMON'})
            )
          })
        )
      })
    )
  });


  constructor(
    private actions$: Actions,
    private _pokemon: PokemonService,
    public toastController: ToastController
  ){ }


}
