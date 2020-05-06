import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, Sort } from '@angular/material';
import { ColumnConfig } from 'src/app/models/column-config.model';
import { SelectionConfig } from 'src/app/models/selection-config.model';


/*
 * data table with front-end pagination
 */
@Component({
    selector: 'app-shared-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
    @Input() data: any[];
    @Input() title: string;
    @Input() desc: string;
    @Input() enableFilter: boolean = false;
    @Input() enablePagination: boolean = true;
    @Input() columns: ColumnConfig[];
    @Input() selection: SelectionConfig = null;
    @Output() selectedItemChange = new EventEmitter();
    @Output() selectEmiter = new EventEmitter();
    @Output() inputEmiter = new EventEmitter();
    @Input() currValue:string = "";

    id: string;
    radioId: string;
    checked: boolean = false;
    selectedList: Array<any> = [];
    filterList: Array<any> = [];
    columnsToDisplay: string[] = [];
    defaultSortColumn: string;
    sortDirection: string = 'asc';
    primaryValueList: Array<any> = [];
    subPrimaryValueList: Array<any> = [];
    dataSource = new MatTableDataSource();
    selectItemValue: any;
    inputValue: any;
    pageIndex: number = 0;
    filterValue:string = '';

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() { }

    ngOnInit() {
        // set columns
        var i = 0;
        if (this.selection) {
            if (this.selection.isSelection) {
                if (this.selection.isMultiple) {
                    this.columnsToDisplay[0] = 'checkbox';
                    this.emitDefaultSelection(this.data);
                } else {
                    this.columnsToDisplay[0] = 'radio';
                }
                i++;
            }
        }
        for (let col of this.columns) {
            this.columnsToDisplay[i] = col.keyName;
            i++;
        }

        if (!this.id) {
            this.id = Math.random().toString(36).substr(2);
        }

    }

    sortData(sort: Sort) {
        setTimeout(() => {
            // wait a while to let the dataTable refresh
            var sortedData = this.getSyncData();
        }, 10);
    }

    // get sync table data due to the disorder datasource
    getSyncData() {
        var sortedData: Array<any> = [];
        var dataTable = document.getElementById(this.id);
        var tbody = dataTable.children[1];
        var rows = tbody.children;

        var isFirstSpeical: boolean = false;
        if (this.columnsToDisplay[0] == 'checkbox' ||
            this.columnsToDisplay[0] == 'radio') {
            isFirstSpeical = true;
        }

        for (var i = 0; i < rows.length; i++) {
            var rowData = {};
            var row = rows[i];
            var tds = row.children;
            var startIndex = isFirstSpeical ? 1 : 0;
            for (var j = startIndex; j < tds.length; j++) {
                var key = this.columnsToDisplay[j];
                rowData[key] = tds[j].textContent;
            }
            sortedData.push(rowData);
        }
        return sortedData;
    }

    gotoPage(pageEvent): void {
        this.pageIndex = pageEvent.pageIndex;

        setTimeout(() => {
            // wait a while to let the dataTable refresh
            var pageData = this.getSyncData();
        }, 10);
    }

    gotoFirstPage(): void {
        this.pageIndex = 0;
        this.paginator.firstPage();
        window.scroll(0, 0);
    }

    ngOnChanges(changes: SimpleChanges) {
        // set columns
        this.columnsToDisplay = [];
        var i = 0;
        if (this.selection) {
            if (this.selection.isSelection) {
                if (this.selection.isMultiple) {
                    this.columnsToDisplay[0] = 'checkbox';
                    this.emitDefaultSelection(this.data);
                } else {
                    this.columnsToDisplay[0] = 'radio';
                }
                i++;
            }
        }
        for (let col of this.columns) {
            this.columnsToDisplay[i] = col.keyName;
            i++;
        }
        // refresh data
        this.dataSource = new MatTableDataSource(this.data);
        if (this.enablePagination == true) {
            this.dataSource.paginator = this.paginator;
        }
        this.dataSource.sort = this.sort;
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.data);
            if (this.enablePagination == true) {
                this.dataSource.paginator = this.paginator;
            }
            this.dataSource.sort = this.sort;
        });
        if (this.data != undefined) {
            if (!this.hasCheckedAttr(this.data)) {
                this.deselectAll();
            }
        }

        // this.refresh();
    }

    selectAll(): void {
        if (!this.checked) {
            this.checked = true;
            if (this.enableFilter && this.filterList.length > 0) {
                for (let item of this.filterList) {
                    item['checked'] = true;
                }
                for (let item of this.filterList) {
                    this.selectedList.push(item);
                }
            } else {
                // let count = 0;
                for (let item of this.data) {
                    item['checked'] = true;
                }
                for (let item of this.data) {
                    this.selectedList.push(item);
                }
            }
            this.selectedItemChange.emit(this.selectedList);
        } else {
            this.deselectAll();
        }
    }

    deselectAll(): void {
        this.checked = false;
        if (this.data != undefined) {
            // let count = 0;
            for (let item of this.data) {
                item['checked'] = false;
            }
        }
        this.selectedList = [];
        var element = document.getElementById('form-select-all-' + this.id);
        if (element != null) {
            element['checked'] = false;
        }
        this.selectedItemChange.emit(this.selectedList);
    }

    updateSelectedCheckbox(event,rowData): void {
        if(!rowData.checked){
            rowData.checked = true;
            this.selectedList.push(rowData);
        }
        else{
            rowData.checked = false;
            this.selectedList.splice(this.selectedList.indexOf(rowData), 1);
        }
        this.selectedItemChange.emit(this.selectedList);
    }


    updateSelectedRadio(event, rowData): void {
        this.selectedList = [];
        if (event.target.checked) {
            var lastIndex = event.target.id.toString().length;
            var firstIndex = event.target.id.lastIndexOf('-');
            this.radioId = event.target.id.substr(firstIndex + 1, lastIndex);
        }
        this.inputValue = rowData;
        this.selectItemValue = rowData;
        this.selectedList.push(rowData);
        this.selectedItemChange.emit(this.selectedList);
    }

    applyFilter(filterValue: string) {
        this.filterValue = filterValue;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.filterList = this.dataSource.filteredData;
    }

    outPutSelectedItem(e) {
        // console.log("data-table-emit:" + e);
        this.selectEmiter.emit(e);
    }

    emitDefaultSelection(data): void {
        if (data != undefined) {
            if (this.hasCheckedAttr(data)) {
                this.selectedList = [];
                for (let datum of data) {
                    if (datum.checked) {
                        this.selectedList.push(datum);
                    }
                }
                this.selectedItemChange.emit(this.selectedList);
            }
        }
    }

    hasCheckedAttr(data): boolean {
        var flag = false;
        for (let datum of data) {
            if (datum.checked != undefined) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    labelChange(value, i): void {
        this.inputEmiter.emit({ "value": value, "number": i });
    }

    getSelectedKey(select): void {
        this.selectEmiter.emit(select);
    }

    clearFilterInput(){
        this.filterValue = '';
    }
}