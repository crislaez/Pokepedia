import { Common } from "@newPokeData/shared/utils/models";

export interface MoveResponse {
  "count": number;
  "next": string;
  "previous": string;
  "results": Common[];
}

export interface Move {
  "accuracy"?: number;
  "contest_combos"?: ContestComboItems;
  "contest_effect"?: Url;
  "contest_type"?: Common[];
  "damage_class"?: Common;
  "effect_chance"?: number,
  "effect_changes"?: any[],
  "effect_entries"?: any[],
  "flavor_text_entries"?: FlavorTextEntry[];
  "generation"?: Common;
  "id"?: number;
  "learned_by_pokemon"?: Common[];
  "machines"?: any[],
  "meta"?: Meta;
  "name"?: string;
  "names"?: Name[];
  "past_values"?: PastValues[];
  "power"?: number;
  "pp"?: number;
  "priority"?: number;
  "stat_changes"?: StatChange[],
  "super_contest_effect"?: Url;
  "target"?: Common;
  "type"?: Common;
}

export interface ContestCombo {
  "normal": ContestComboItems
  "super": ContestComboItems
}

export interface ContestComboItems {
  "use_after"?: Common[]
  "use_before"?: Common[]
}

export interface Url {
  "url": string;
}

export interface FlavorTextEntry{
  "flavor_text": string;
  "language": Common;
  "version_group": Common;
}

export interface Name{
  "language": Common;
  "name": string;
}

export interface Meta {
  "ailment": {},
  "ailment_chance": number;
  "category": {},
  "crit_rate":  number;
  "drain":  number;
  "flinch_chance":  number;
  "healing":  number;
  "max_hits": null;
  "max_turns": null,
  "min_hits": null,
  "min_turns": null,
  "stat_chance": number;
}

export interface PastValues {
  "accuracy": number;
  "effect_chance": any,
  "effect_entries": any[],
  "power": number;
  "pp": number;
  "type": number;
  "version_group": Common;
}

export interface StatChange{
  "change": number;
  "stat": Common
}
