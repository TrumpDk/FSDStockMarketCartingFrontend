import { Component, OnInit } from '@angular/core';
import { StockPriceService } from 'src/app/services/stock-price.service';
import { environment } from 'src/environments/environment';
import { AppUiService } from 'src/app/services/app-ui-service';

@Component({
  selector: 'app-import-stock-price',
  templateUrl: './import-stock-price.component.html',
  styleUrls: ['./import-stock-price.component.css']
})
export class ImportStockPriceComponent implements OnInit {
  file: File;
  fileName: any = '';

  constructor(
    private appUiService: AppUiService,
    private stockPriceSvc: StockPriceService
    ) { }

  ngOnInit() {
  }

  /**
   * upload stock price
   */
  uploadStockPrice(): void {
    console.log('upload stock price from file...');
    if(this.fileName == ''){
      this.appUiService.setMsg(['danger', 'Please select a File First']);
      window.scroll(0, 0);
    }else{
      this.stockPriceSvc.uploadStockPrice(this.file).subscribe(
        data => {
          //console.log('response===',data);
          this.appUiService.setMsg(['success', 'Stock price upload success!']);
          window.scroll(0, 0);
        },
        error => {
          //console.log('error===',error);
          if(error['status'] == 200) {
            this.appUiService.setMsg(['success', 'Stock price upload success!']);
          }else{
            this.appUiService.setMsg(['danger', error]);
          }
          window.scroll(0, 0);
        }
      );
      
    }
  }

 /**
  * select/ change select file
  * @param fileInputEvent
  */
  fileSelectionChange(fileInputEvent: any) {
    if(fileInputEvent.target.files.length > 0) {
      this.file = fileInputEvent.target.files[0];
      this.fileName = fileInputEvent.target.files[0].name;
      this.appUiService.setMsg([]);
    } else {
      this.fileName = '';
    }
  }

  /**
   * Download the sample excel file
   */
  downloadSample(): void {
    console.log('download the sample excel file...');
    window.location.href = `${environment.base_api_url}${'sp/sample_excel'}`;
  }

}
