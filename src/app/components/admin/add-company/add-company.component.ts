import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { AppUiService } from 'src/app/services/app-ui-service';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { Sector } from 'src/app/models/sector.model';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  
  company: Company = {
    "companyName": '',
    "turnover": 0,
    "listedStockExchanges": '',
    "sectorCode": ''
  };
  stockExchanges: StockExchange[] = [];
  sectors: Sector[] = [];

  constructor(
    private appUiService: AppUiService,
    private exchangeSvc: StockExchangeService,
    private sectorSvc: SectorService,
    private companySvc: CompanyService,
    private router: Router) { }

  ngOnInit() {
    //init stock exchange list
    this.exchangeSvc.getAllStockExchanges().subscribe(
      data => {
        this.stockExchanges = data;
      }
    );

    //init stock sector list
    this.sectorSvc.getAllSectors().subscribe(
      data => {
        this.sectors = data;
      }
    );

  }

  addCompany(): void {
    console.log(this.company);
    if(this.validateInput(this.company)){
      this.companySvc.addCompany(this.company).subscribe(
        res => {
          console.log('add company response===',res);
          this.appUiService.setMsg(['success', 'Company add success!']);
        },
        err => {
          console.log('add company err===',err);
          this.appUiService.setMsg(['danger', err.error]);
        }
      )
    }
    
  }

  validateInput(company: Company): boolean {
    let validateRst = false;
    if(!company.companyName || company.companyName.trim() == ''){
      this.appUiService.setMsg(['danger', "Company Name can't empty!"]);
    }else if(!company.sectorCode || company.sectorCode.trim() == ''){
      this.appUiService.setMsg(['danger', "Stock Sector can't empty!"]);
    }else if(!company.listedStockExchanges || company.listedStockExchanges.trim() == ''){
      this.appUiService.setMsg(['danger', "Listed Stock Exchanges can't empty!"]);
    }else {
      validateRst = true;
    }
    
    return validateRst;
  }

  reset(): void {
    this.appUiService.setMsg([]);
    this.company = {
      "boardDirectors": "",
      "brief": "",
      "ceo": "",
      "companyName": "",
      "listedStockExchanges": "",     ​​
      "sectorCode": "",
      "stockCodes": "",
      "turnover": 0
    };
  }

}
