import { EntityStatus } from '@newPokeData/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from '../actions/pokemon.actions';
import { PokemonList, Pokemon } from '../models';

export const pokemonFeatureKey = 'pokemon';

export interface State{
  pokemonList?: PokemonList[];
  status?: EntityStatus;
  error?: unknown;
  count?:number;
  pokedexNumber?:string;

  pokemon?: Pokemon;
  pokemonStatus?: EntityStatus;
  pokemonError?: unknown;
}

const initialState: State = {
  pokemonList: [],
  status: EntityStatus.Initial,
  error:undefined,
  count:0,

  pokemon: {},
  pokemonStatus: EntityStatus.Initial,
  pokemonError:undefined
}


export const reducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemonList, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PokemonActions.savePokemonList, (state, { pokedexNumber, pokemonList, error, count, status }) => ({...state, pokedexNumber, pokemonList, count, error, status })),

  on(PokemonActions.loadPokemon, (state) => ({ ...state, pokemonError: undefined,  pokemonStatus: EntityStatus.Pending })),
  on(PokemonActions.savePokemon, (state, { pokemon, error, status }) => ({...state, pokemon, pokemonError: error, pokemonStatus: status })),
);

