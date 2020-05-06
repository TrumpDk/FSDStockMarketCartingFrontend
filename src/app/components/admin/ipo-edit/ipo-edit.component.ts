import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUiService } from 'src/app/services/app-ui-service';
import { IPOService } from 'src/app/services/ipo.service';
import { IPO } from 'src/app/models/ipo.model';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { StockExchangeComponent } from '../stock-exchange/stock-exchange.component';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';

@Component({
  selector: 'app-ipo-edit',
  templateUrl: './ipo-edit.component.html',
  styleUrls: ['./ipo-edit.component.css']
})
export class IpoEditComponent implements OnInit {
   ipoDetail: IPO = {
     "id": null,
    "companyId": null,
    "companyName": null,
    "exchangeCode": null,
    "exchangeName": null,
    "pricePerShare": null,
    "shareCount": null,
    "openDate": null,
    "remark": null,
   };

   companies: Company[] = [];
   stockExchages: StockExchange [] = [];

  constructor(
    private appUiService: AppUiService,
    private ipoSvc: IPOService,
    private companySvc: CompanyService,
    private stockExchangeSvc: StockExchangeService,
    private router: Router,
    private routeInfo: ActivatedRoute
    ) { }

  ngOnInit() {
    let ipoId = this.routeInfo.snapshot.queryParams["id"];
    console.log('ipo id===', ipoId);
    
    // Get IPO Info
    if(ipoId){
      this.ipoSvc.getIPO(ipoId).subscribe(
        data=> {
          this.ipoDetail = data;
        }
      )
    }

    // Get companies List
    // this.companySvc.getAllCompanies().subscribe(
    //   data => {
    //       this.companies = data;
    //   }
    // );

    // Get stock exchanges
    // this.stockExchangeSvc.getAllStockExchanges().subscribe(
    //   data => {
    //     this.stockExchages = data;
    //   }
    // );

    

  }

  

  saveIPO(){
    console.log('save IPO....');
    
  }

}
