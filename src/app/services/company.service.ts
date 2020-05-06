import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpSvc: HttpService) { }

  /**
   * Get company list
   */
  getAllCompanies(): Observable<Company[]> {
    return this.httpSvc.get("company/companies").pipe();
  }

  /**
   * Get company by id
   * @param id 
   */
  getCompany(id: number): Observable<Company> {
    var url = 'company/' + id;
    return this.httpSvc.get(url).pipe();
  }

  /**
   * Add new company
   * @param company 
   */
  addCompany(company: Company): Observable<Boolean> {
    return this.httpSvc.post('company/addition',company).pipe();
  }


}
