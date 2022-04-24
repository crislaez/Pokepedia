import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@newPokeData/core/services/core-config.service';
import { Common } from '@newPokeData/shared/utils/models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Move, MoveResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  baseURL: string = `${this._coreConfig.getEndpoint()}`;


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getMoves(): Observable<{movesList:Common[], count:number }>{
    return this.http.get<MoveResponse>(`${this.baseURL}move?limit=-1`).pipe(
      map((response) => {
        const { results = null, count = 0 } = response || {};
        return {movesList: results || [], count: count  }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getMove(id: string): Observable<Move>{
    return this.http.get<MoveResponse>(`${this.baseURL}move/${id}`).pipe(
      map((move) => {
        return (move || {})
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


}
