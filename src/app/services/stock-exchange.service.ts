import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { StockExchange } from '../models/stock-exchange.model';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {

  constructor(private httpSvc: HttpService) { }

  /**
   * Get stock exchange list
   */
  getAllStockExchanges(): Observable<StockExchange[]> {
    return this.httpSvc.get("se/stock_exchanges").pipe();
  }

}
