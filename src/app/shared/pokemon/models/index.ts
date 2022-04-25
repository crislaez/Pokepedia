import { Common } from "@newPokeData/shared/utils/models";

export interface PokemonsResponse {
  'descriptions'?: any[]
  'id'?: number;
  'is_main_series'?: boolean;
  'name'?: string;
  'names': any[];
  'pokemon_entries'?: PokemonEntries[]
  'region'?: any;
  'version_groups'?: any;
  'count'?: number;
  'next'?: string
  'previous'?: string
  'results'?: PokemonList[];
}

export interface PokemonList {
  'name'?: string;
  'url'?: string;
}

export interface Pokemons {
  'name'?: string;
  'url'?: string;
  'types'?:Common[]
}

export interface PokemonEntries {
  'entry_number'?: number;
  'pokemon_species'?: PokemonList[]
}

export interface Pokemon {
  'abilities'?: AbilityObj[];
  'base_experience'?: number;
  'forms'?: Common[];
  'game_indices'?: GameIndex[];
  'height'?: number;
  'held_items'?: any[];
  'id'?: number;
  'is_default'?: boolean;
  'location_area_encounters'?: string;
  'moves'?: Move[];
  'name'?:string;
  'order'?: number;
  'past_types'?: any[]
  'species'?: any;
  'sprites'?: Sprites;
  'stats'?: Stats[];
  'types'?: Type[];
  'weight'?: number;
  'encounters'?: any;
  'flavor_text_entries'?: any[];
  'habitat'?: Common;
  'varieties'?:Variety[];
  'egg_groups'?: any[];
}

export interface PokemonResponse {
  'abilities': AbilityObj[];
  'base_experience': number;
  'forms': Common[]
  'game_indices': GameIndex[]
  'height': number;
  'held_items': []
  'id': number;
  'is_default': boolean;
  'location_area_encounters': string;
  'moves': Move[];
  'name': string;
  'order': number;
  'past_types': any[]
  'species': Common;
  'sprites': Sprites;
  'stats': Stats[];
  'types': Type[];
  'weight': number;
}

export interface AbilityObj {
  'ability': Common;
  'is_hidden': boolean;
  'slot': number;
}

export interface GameIndex {
  "game_index": number;
  "version": Common;
}

export interface Move {
  "move": Common;
  "version_group_details": VersionGroupDetais[];
}

export interface VersionGroupDetais {
  'level_learned_at': number;
  'move_learn_method': Common;
  'version_group': Common
}

export interface Stats {
  'base_stat': number;
  'effort': number;
  'stat': Common
}

export interface Type {
  'slot': number;
  'type': Common
}

export interface Variety {
'is_default': boolean;
'pokemon': Common;
}

export interface Image {
  'back_default'?: string;
  'back_female'?: string;
  'back_shiny'?: string;
  'back_shiny_female'?: string;
  'front_default'?: string;
  'front_female'?: string;
  'front_shiny'?: string;
  'front_shiny_female'?: string;
}

export interface Sprites extends Image {
  'other': Other
  'versions': Image;
}

export interface Other {
  'dream_world': Image;
  'home': Image;
  'official-artwork': Image;
}

export interface DreamWorld {
  'front_default': string;
  'front_female': string;
}

export interface Home {
  'front_default': string;
  'front_female': string;
  'front_shiny': string;
  'front_shiny_female': string;
}

export interface OfficialArtwork {
  'front_default': string;
}



