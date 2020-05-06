import { Component, OnInit } from '@angular/core';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { AppUiService } from 'src/app/services/app-ui-service';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { SectorService } from 'src/app/services/sector.service';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.css']
})
export class CompareCompanyComponent implements OnInit {
  config:any;
  pieConfig: any = {};
  barConfig: any = {};
  lineConfig: any = {};
  stockExchanges: StockExchange[] = [];
  companies: Company[] = [];
  selectedStockExchange : string = '';
  selectedCompanyStockCode: string = '';
  fromDate: string;
  toDate: string;

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

    //init company list
    this.companySvc.getAllCompanies().subscribe(
      data => {
        this.companies = data;
      }
    );

    //init stock sector list
    // this.sectorSvc.getAllSectors().subscribe(
    //   data => {
    //     this.sectors = data;
    //   }
    // );


    this.config = {
      type: 'pie', //line, bar, pie
      data: {
        labels: ["Mi Cell Phone", "Google", "IBM", "Microsoft", "Apple", "State Bank  of India"],
        datasets: [{
          label: 'Compare Company',
          data: [10000, 15000, 6000, 5000, 20000, 35000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        },
      }
    }

    Object.assign(this.pieConfig, this.config);
    Object.assign(this.barConfig, this.config);
    Object.assign(this.lineConfig, this.config);

    this.pieConfig['type'] = 'pie';
    this.barConfig['type'] = 'bar';
    this.lineConfig['type'] = 'line';

  }

}
