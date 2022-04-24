import { Common } from "@newPokeData/shared/utils/models";

export interface PokedexResponse {
  "count": number,
  "next": string,
  "previous": string,
  "results": Common[]
}
