import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { STAVKA_PORUDZBINE_URI, STAVKE_FOR_PORUDZBINA_URI } from '../constants';
import { StavkaPorudzbine } from '../models/stavkaPorudzbine';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  constructor(private httpClient: HttpClient) { }

  public getStavkaPorudzbineByPorudzbina(idPorudzbine: number): Observable<any>{
    return this.httpClient.get(`${STAVKE_FOR_PORUDZBINA_URI}/${idPorudzbine}`);
  }

  public addStavkaPorudzbine(stavkaPorudzbine : StavkaPorudzbine): Observable<any>{
    stavkaPorudzbine.id = 100000;
    return this.httpClient.post(`${STAVKA_PORUDZBINE_URI}`, stavkaPorudzbine)
  }

  public updateStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): Observable<any>{
    return this.httpClient.put(`${STAVKA_PORUDZBINE_URI}`, stavkaPorudzbine);
  }

  public deleteStavkaPorudzbine(id: number): Observable<any>{
    return this.httpClient.delete(`${STAVKA_PORUDZBINE_URI}/${id}`);
  }
}
