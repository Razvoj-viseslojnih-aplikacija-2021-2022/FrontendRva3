import { PORUDZBINA_URI } from './../constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Porudzbina } from '../models/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  constructor(private httpClient: HttpClient) { }

  public getAllPorudzbina(): Observable<any> {
    return this.httpClient.get(`${PORUDZBINA_URI}`);
  }

  public insertPorudzbina(porudzbina: Porudzbina): Observable<any> {
    porudzbina.id = 150; 
    return this.httpClient.post(`${PORUDZBINA_URI}`, porudzbina);
  }

  public updatePorudzbina(porudzbina: Porudzbina): Observable<any> {
    return this.httpClient.put(`${PORUDZBINA_URI}`, porudzbina);
  }

  public deletePorudzbina(id: number): Observable<any> {
    return this.httpClient.delete(`${PORUDZBINA_URI}/${id}`);
  }
}
