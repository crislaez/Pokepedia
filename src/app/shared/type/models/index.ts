import { Common } from '@newPokeData/shared/utils/models';

export interface Type {
  "damage_relations"?: TypesResponse;
  "game_indices"?: gameIndices[];
  "generation"?: Common;
  "id"?: number;
  "move_damage_class"?: Common;
  "moves"?: Common[];
  "name"?: string;
  "names"?: Names[];
  "past_damage_relations"?: PastDamageRelations[];
  "pokemon"?: Common[]
}

export interface TypesResponse {
  "count": number;
  "next": string;
  "previous": string;
  "results": Common[];
}

export interface DamageRelations {
  "double_damage_from": Common[];
  "double_damage_to": Common[];
  "half_damage_from": Common[];
  "half_damage_to": Common[];
  "no_damage_from": Common[];
  "no_damage_to": Common[];
}

export interface gameIndices {
  "game_index": number;
  "generation": Common;
}

export interface Names {
  "language": Common
  "name": string;
}

export interface PastDamageRelations {
  "damage_relations": DamageRelations,
  "generation": string;
}

