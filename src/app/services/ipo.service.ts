import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IPO } from '../models/ipo.model';

@Injectable({
  providedIn: 'root'
})
export class IPOService {

  constructor(private httpSvc: HttpService) { }

  /**
   * Get IPO list
   */
  getAllIPOs(): Observable<IPO[]> {
    return this.httpSvc.get("ipo/ipos").pipe();
  }

  /**
   * Get IPO by id
   * @param id 
   */
  getIPO(id: number): Observable<IPO> {
    var url = 'ipo/' + id;
    return this.httpSvc.get(url).pipe();
  }

  /**
   * Add new IPO
   * @param ipo 
   */
  addIPO(ipo: IPO): Observable<Boolean> {
    return this.httpSvc.post('ipo/addition',ipo).pipe();
  }


}
