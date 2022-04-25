import { EntityStatus } from '@newPokeData/shared/utils/models';
import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonList, Pokemons } from '../models';


export const loadPokemonList = createAction(
  '[Pokemon] Load Pokemon List',
  props<{pokedexNumber: string}>()
);

export const savePokemonList = createAction(
  '[Pokemon] Save Pokemon List',
  props<{pokedexNumber: string, pokemonList: PokemonList[], error:unknown, count:number, status: EntityStatus}>()
);


export const loadPokemonsTypes = createAction(
  '[Pokemon] Load Pokemon Types',
  props<{pokemonList: PokemonList[], slice:number}>()
);

export const savePokemonsTypes = createAction(
  '[Pokemon] Save Pokemon Types',
  props<{pokemons: Pokemons[], error:unknown, status: EntityStatus, slice:number}>()
);


export const loadPokemon = createAction(
  '[Pokemon] Load pokemon',
  props<{id: string}>()
);

export const savePokemon = createAction(
  '[Pokemon] Save pokemon',
  props<{pokemon: Pokemon, error:unknown, status: EntityStatus}>()
);
