import { Component, OnInit } from '@angular/core';
import { StockExchange } from 'src/app/models/stock-exchange.model';
import { AppUiService } from 'src/app/services/app-ui-service';
import { Router } from '@angular/router';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { ColumnConfig } from 'src/app/models/column-config.model';
import { SelectionConfig } from 'src/app/models/selection-config.model';

@Component({
  selector: 'stock-exchange',
  templateUrl: './stock-exchange.component.html',
  styleUrls: ['./stock-exchange.component.css']
})
export class StockExchangeComponent implements OnInit {

  stockExchanges: StockExchange[];

  // table display params below
  title: String = "Stock Exchange List";
  columns: ColumnConfig[] = [
      { keyName: 'stockExchange', displayLabel: 'Stock Exchange', isSort: true },
      { keyName: 'brief', displayLabel: 'Brief', isSort: true },
      { keyName: 'contactAddress', displayLabel: 'Contact Address', isSort: true },
      { keyName: 'remarks', displayLabel: 'Remarks', isSort: true }
      //{ keyName: 'id', displayLabel: 'Action', dataType: 'link', routerLink: '/admin-home', isSort: true }
  ];
  selection: SelectionConfig = { isSelection: false, isMultiple: false };

  constructor(
    private appUiService: AppUiService,
    private exchangeSvc: StockExchangeService,
    private router: Router) { }


  ngOnInit() {
    this.exchangeSvc.getAllStockExchanges().subscribe(
      data => {
        console.log('stock exchange list===',data);
        this.stockExchanges = data;
      }
    )
  }

}
