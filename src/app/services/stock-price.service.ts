import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { StockPrice } from '../models/stock-price.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  constructor(private httpSvc: HttpService) { }

  /**
   * Get stock price list
   */
  getAllStockPrices(): Observable<StockPrice[]> {
    return this.httpSvc.get("sp/stock_prices").pipe();
  }

  /**
   * Get stock price by id
   * @param id 
   */
  getStockPrice(id: number): Observable<StockPrice> {
    var url = 'sp/' + id;
    return this.httpSvc.get(url).pipe();
  }

  /**
   * Add new stock price
   * @param StockPrice 
   */
  addStockPrice(StockPrice: StockPrice): Observable<Boolean> {
    return this.httpSvc.post('sp/addition',StockPrice).pipe();
  }


  /**
   * Upload Stock Price
   */
  uploadStockPrice(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('content-type', 'need-delete');
    this.httpSvc.combineHeaders(headers);
    return this.httpSvc.post("sp/upload", formData);
  }


}
