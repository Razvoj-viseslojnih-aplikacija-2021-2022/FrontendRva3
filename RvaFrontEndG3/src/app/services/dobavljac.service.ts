import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOBAVLJAC_URI } from '../constants';
import { Dobavljac } from '../models/dobavljac';

@Injectable({
  providedIn: 'root'
})
export class DobavljacService {

  constructor(private httpClient: HttpClient) { }

  public getAllDobavljac(): Observable<any> {
    return this.httpClient.get(`${DOBAVLJAC_URI}`);
  }

  public insertDobavljac(dobavljac: Dobavljac): Observable<any> {
    dobavljac.id = 150; 
    return this.httpClient.post(`${DOBAVLJAC_URI}`, dobavljac);
  }

  public updateDobavljac(dobavljac: Dobavljac): Observable<any> {
    return this.httpClient.put(`${DOBAVLJAC_URI}`, dobavljac);
  }

  public deleteDobavljac(id: number): Observable<any> {
    return this.httpClient.delete(`${DOBAVLJAC_URI}/${id}`);
  }
}
