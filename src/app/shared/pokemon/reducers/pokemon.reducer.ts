import { EntityStatus } from '@newPokeData/shared/utils/models';
import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from '../actions/pokemon.actions';
import { PokemonList, Pokemon, Pokemons } from '../models';

export const pokemonFeatureKey = 'pokemon';

export interface State{
  pokemonList?: PokemonList[];
  pokemons?: Pokemons[];
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
  pokemons: [],
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

  on(PokemonActions.loadPokemonsTypes, (state) => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(PokemonActions.savePokemonsTypes, (state, { pokemons, error, status, slice }) => {
    const statusPokemons = [
      ...(slice !== 20 ? state?.pokemons: []),
      ...(pokemons ? pokemons : []),
    ];

    return {
      ...state,
      pokemons: statusPokemons,
      error,
      status
    }
  }),

  on(PokemonActions.loadPokemon, (state) => ({ ...state, pokemonError: undefined,  pokemonStatus: EntityStatus.Pending })),
  on(PokemonActions.savePokemon, (state, { pokemon, error, status }) => ({...state, pokemon, pokemonError: error, pokemonStatus: status })),
);

