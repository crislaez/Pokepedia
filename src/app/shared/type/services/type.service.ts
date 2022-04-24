import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@newPokeData/core/services/core-config.service';
import { Common } from '@newPokeData/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Type, TypesResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getMoves(): Observable<{typesList:Common[], count:number }>{
    return this.http.get<TypesResponse>(`${this.baseURL}type?limit=-1`).pipe(
      map((response) => {
        const { results = null, count = 0 } = response || {};
        return {typesList: (results || [])?.filter(({name}) => name !== 'unknown') || [], count: count  }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMove(id: string): Observable<Type>{
    return this.http.get<any>(`${this.baseURL}type/${id}`).pipe(
      map((move) => {
        return ({
          ...move,
          pokemon: (move?.pokemon || [])?.map(({pokemon}) => (pokemon))
        } || {})
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
