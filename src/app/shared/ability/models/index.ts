import { Common } from "@newPokeData/shared/utils/models";

export interface AbilityResponse {
  "count": number;
  "next": string;
  "previous": string;
  "results": Common[];
}

export interface Ability {
  "effect_changes"?: EffectChanges[];
  "effect_entries"?: EffectEntries[];
  "flavor_text_entries"?: FlavorTextEntries[];
  "generation"?: Common;
  "id"?: number;
  "is_main_series"?: boolean;
  "name"?: string;
  "names"?: AbilityNames[],
  "pokemon"?: Common[];
}

export interface AbilityResponse {
  "effect_changes"?: EffectChanges[];
  "effect_entries"?: EffectEntries[];
  "flavor_text_entries"?: FlavorTextEntries[];
  "generation"?: Common;
  "id"?: number;
  "is_main_series"?: boolean;
  "name"?: string;
  "names"?: AbilityNames[],
  "pokemon"?: AbilityPokemon[];
}

export interface AbilityPokemon {
  "is_hidden"?: boolean;
  "pokemon"?: Common
  "slot"?: number;
}

export interface AbilityNames {
  "language"?: Common;
  "name"?: string;
}

export interface FlavorTextEntries {
  "flavor_text"?: string;
  "language"?: Common;
  "version_group"?: Common;
}

export interface EffectEntries {
  "effect"?: string;
  "language"?: Common;
  "short_effect"?: string;
}

export interface EffectChanges {
  "effect_entries"?: EffectEntries[],
  "version_group"?: Common;
}
