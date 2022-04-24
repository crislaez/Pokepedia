import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@newPokeData/core/services/core-config.service';
import { Common } from '@newPokeData/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PokedexResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getPokedex(): Observable<{pokedex:Common[], count:number }>{
    return this.http.get<PokedexResponse>(`${this.baseURL}pokedex?limit=-1`).pipe(
      map((response) => {
        const { results = null, count = 0 } = response || {};
        return { pokedex: results || [], count };
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
