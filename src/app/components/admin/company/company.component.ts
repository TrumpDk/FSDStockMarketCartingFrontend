import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ColumnConfig } from 'src/app/models/column-config.model';
import { SelectionConfig } from 'src/app/models/selection-config.model';
import { AppUiService } from 'src/app/services/app-ui-service';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[];

  // table display params below
  title: String = "company List";
  columns: ColumnConfig[] = [
      { keyName: 'companyName', displayLabel: 'Name', isSort: true },
      { keyName: 'turnover', displayLabel: 'Turnover', isSort: true },
      { keyName: 'ceo', displayLabel: 'CEO', isSort: true },
      { keyName: 'boardDirectors', displayLabel: 'Board Directors', isSort: true },
      { keyName: 'listedStockExchanges', displayLabel: 'Listed Exchanges', isSort: true },
      { keyName: 'stockCodes', displayLabel: 'Stock Code', isSort: true },
      { keyName: 'sectorCode', displayLabel: 'Sector', isSort: true },
      { keyName: 'brief', displayLabel: 'Brief', isSort: true }
      //{ keyName: 'id', displayLabel: 'Action', dataType: 'link', routerLink: '/admin-home', isSort: true }
  ];
  selection: SelectionConfig = { isSelection: false, isMultiple: false };

  constructor(
    private appUiService: AppUiService,
    private companySvc: CompanyService,
    private router: Router) { }


  ngOnInit() {
    //clean msg
    this.appUiService.setMsg([]);
    
    this.companySvc.getAllCompanies().subscribe(
      data => {
        console.log('company list===',data);
        this.companies = data;
      }
    )
  }

}
