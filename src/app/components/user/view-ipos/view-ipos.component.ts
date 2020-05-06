import { Component, OnInit } from '@angular/core';
import { IPO } from 'src/app/models/ipo.model';
import { ColumnConfig } from 'src/app/models/column-config.model';
import { SelectionConfig } from 'src/app/models/selection-config.model';
import { AppUiService } from 'src/app/services/app-ui-service';
import { IPOService } from 'src/app/services/ipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-ipos',
  templateUrl: './view-ipos.component.html',
  styleUrls: ['./view-ipos.component.css']
})
export class ViewIposComponent implements OnInit {
  ipos: IPO[] = [];

  // table display params below
  title: String = "IPO Details";
  columns: ColumnConfig[] = [
      { keyName: 'companyName', displayLabel: 'Company Name', isSort: true },
      { keyName: 'exchangeName', displayLabel: 'Stock Exchange', isSort: true },
      { keyName: 'pricePerShare', displayLabel: 'Price Per Share', isSort: true },
      { keyName: 'shareCount', displayLabel: 'Total number of Shares', isSort: true },
      { keyName: 'openDate', displayLabel: 'Open Date Time', isSort: true },
      { keyName: 'remark', displayLabel: 'Remarks', isSort: true }
  ];
  selection: SelectionConfig = { isSelection: false, isMultiple: false };

  constructor(
    private appUiService: AppUiService,
    private ipoSvc: IPOService,
    private router: Router) { }


  ngOnInit() {
    //clean msg
    this.appUiService.setMsg([]);
    
    this.ipoSvc.getAllIPOs().subscribe(
      data => {
        console.log('ipo details list===',data);
        this.ipos = data;
      }
    )
  }

}
