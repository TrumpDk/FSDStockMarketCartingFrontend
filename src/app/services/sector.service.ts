import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private httpSvc: HttpService) { }

  /**
   * Get Sector list
   */
  getAllSectors(): Observable<Sector[]> {
    return this.httpSvc.get("sector/sectors").pipe();
  }

  /**
   * Get sector by id
   * @param id 
   */
  getSector(id: number): Observable<Sector> {
    var url = 'sector/' + id;
    return this.httpSvc.get(url).pipe();
  }

  /**
   * Add new sector
   * @param sector 
   */
  addSector(sector: Sector): Observable<Boolean> {
    return this.httpSvc.post('sector/addition',sector).pipe();
  }


}
