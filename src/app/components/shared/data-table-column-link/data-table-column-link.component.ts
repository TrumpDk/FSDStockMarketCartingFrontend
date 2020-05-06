import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-data-table-column-link',
  templateUrl: './data-table-column-link.component.html',
  styleUrls: ['./data-table-column-link.component.css']
})
export class DataTableColumnLinkComponent implements OnInit {

  @Input() routerLink: string;
  @Input() queryParamNeeded: boolean = false;
  @Input() queryParamKey: string;
  @Input() queryParamValue: string;
  @Input() displayLabel: string;
  @Input() routerParam: boolean = false;
  querParam:any = {};

  constructor() { }

  ngOnInit() {
    if(this.routerParam) {
      this.queryParamNeeded = false;
      this.routerLink = this.routerLink+this.queryParamValue;
    }
    if(this.queryParamNeeded) {
      this.querParam[this.queryParamKey] = this.queryParamValue;
    }
  }

}
