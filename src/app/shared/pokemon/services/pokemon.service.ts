import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@newPokeData/core/services/core-config.service';
import { Common } from '@newPokeData/shared/utils/models';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Pokemon, PokemonList, PokemonResponse, PokemonsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getPokemons(pokedexNumber:string = '0'): Observable<{pokemonList:PokemonList[], count:number }>{
    const url = pokedexNumber === '0' ? 'pokemon' : `pokedex/${pokedexNumber}`;

    return this.http.get<any>(`${this.baseURL}${url}?limit=-1`).pipe(
      map((response) => {
        const { results = null, count = 0, pokemon_entries = null } = response || {};
        const data = pokedexNumber === '0'
                  ? results
                  : (pokemon_entries || [])?.map(item => {
                      const { pokemon_species = null } = item || {};
                      return {...pokemon_species}
                  });

        return {pokemonList: data || [], count: count || data?.length }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getPokemonType(id: string): Observable<Common[]>{
    return this.http.get<PokemonResponse>(`${this.baseURL}pokemon/${id}`).pipe(
      map((pokemon) => {
        const types = (pokemon?.types || [])?.map(item => (item?.type))
        return ( types || []);
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getPokemon(id: string): Observable<Pokemon>{
    return this.http.get<PokemonResponse>(`${this.baseURL}pokemon/${id}`).pipe(
      switchMap((pokemon) => {
        const { species = null, location_area_encounters = null } = pokemon || {};
        const { url = null } = species || {};

        if(url){
          return forkJoin([
            this.getPokemonSpecie(url).pipe(catchError(() => of(null))),
            this.getEncounter(location_area_encounters).pipe(catchError(() => of(null)))
          ]).pipe(
            map(([species, encounters]) => {
              const { evolution_chain = null, flavor_text_entries = null, habitat = null, egg_groups = null, varieties = null } = species || {}
              return {
                ...pokemon,
                ...(species ? { species:evolution_chain } : {}),
                ...(flavor_text_entries ? { flavor_text_entries }: {}),
                ...(habitat ? { habitat }: {}),
                ...(varieties ? { varieties }: {}),
                ...(egg_groups ? { egg_groups }: {}),
                ...(encounters ? { encounters }: {})
              }
            })
          );
        }

        return of(pokemon);
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getPokemonSpecie(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(
      switchMap(( {evolution_chain, flavor_text_entries, habitat, egg_groups, varieties}) => {
        const { url = null } = evolution_chain || {};

        if(url) return this.getEvolutionChain(url).pipe(map((chain) => ({evolution_chain:chain, flavor_text_entries, habitat, egg_groups, varieties})))

        return of({evolution_chain:null, flavor_text_entries, habitat, egg_groups, varieties})
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getEvolutionChain(url:string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map((evolutions) => (evolutions || {})),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

  getEncounter(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(
      map(res => (res || [])),
      catchError((error) => {
        return throwError(error)
      })
    );
  }

}
