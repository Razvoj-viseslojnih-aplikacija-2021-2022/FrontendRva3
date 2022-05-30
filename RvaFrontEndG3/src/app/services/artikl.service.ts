import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARTIKL_URI } from '../constants';
import { Artikl } from '../models/artikl';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {

  constructor(private httpClient: HttpClient) { }

  public getAllArtikls(): Observable<any>{
    return this.httpClient.get(`${ARTIKL_URI}`);
  }

  public insertArtikl(artikl: Artikl): Observable<any> {
    artikl.id = 150;
    return this.httpClient.post(`${ARTIKL_URI}`, artikl); 
  }

  public updateArtikl(artikl: Artikl): Observable<any> {
    return this.httpClient.put(`${ARTIKL_URI}`, artikl); 
  }

  public deleteArtikl(id: number): Observable<any> {
    return this.httpClient.delete(`${ARTIKL_URI}/${id}`); 
  }
}
