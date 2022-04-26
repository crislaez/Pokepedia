import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@newPokeData/core/services/core-config.service';
import { Common } from '@newPokeData/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ability, AbilityResponse } from '../models';



@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getAbilities(): Observable<{abilitiesList: Common[], count :number}>{
    return this.http.get<AbilityResponse>(`${this.baseURL}ability?limit=-1`).pipe(
      map((response) => {
        const { results = null, count = null } = response || {};
        return {abilitiesList: results || [], count: count};
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getAbility(id: string): Observable<Ability>{
    return this.http.get<any>(`${this.baseURL}ability/${id}`).pipe(
      map((ability) => {
        return {
          ...(ability ?? {}),
          ...( ability?.pokemon?.length > 0 ? { pokemon: (ability?.pokemon || [])?.map(({pokemon}) => (pokemon)) } : {})
        }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }



}
