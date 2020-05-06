import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './components/common/user-register/user-register.component';
import { UserLoginComponent } from './components/common/user-login/user-login.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AppHeaderComponent } from './components/common/app-header/app-header.component';
import { MsgComponent } from './components/common/msg/msg.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AppMenuComponent } from './components/common/app-menu/app-menu.component';
import { DataTableComponent } from './components/shared/data-table/data-table.component';
import { StockExchangeComponent } from './components/admin/stock-exchange/stock-exchange.component';
import { CompanyComponent } from './components/admin/company/company.component';
import { MatSortModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatSelectModule, MatRadioModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatProgressSpinner, MatDatepickerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddStockExchangeComponent } from './components/admin/add-stock-exchange/add-stock-exchange.component';
import { AddCompanyComponent } from './components/admin/add-company/add-company.component';
import { IpoDetailsComponent } from './components/admin/ipo-details/ipo-details.component';
import { DataTableColumnLinkComponent } from './components/shared/data-table-column-link/data-table-column-link.component';
import { IpoEditComponent } from './components/admin/ipo-edit/ipo-edit.component';
import { ViewIposComponent } from './components/user/view-ipos/view-ipos.component';
import { GreetingComponent } from './components/shared/greeting/greeting.component';
import { ChartJsComponent } from './components/shared/chart-js/chart-js.component';
import { ImportStockPriceComponent } from './components/admin/import-stock-price/import-stock-price.component';
import { CompareCompanyComponent } from './components/user/compare-company/compare-company.component';
import { CompareSectorComponent } from './components/user/compare-sector/compare-sector.component';
@NgModule({
  declarations: [
    //Common
    AppComponent,
    AppHeaderComponent,
    AppMenuComponent,
    MsgComponent,

    //Shared
    DataTableComponent,
    DataTableColumnLinkComponent,
    GreetingComponent,
    ChartJsComponent,

    //Login/register
    UserLoginComponent,
    UserRegisterComponent,

    //Admin user function
    AdminHomeComponent,
    UserHomeComponent,
    StockExchangeComponent,
    AddStockExchangeComponent,
    CompanyComponent,
    AddCompanyComponent,
    IpoDetailsComponent,
    IpoEditComponent,
    ImportStockPriceComponent,

    //User function
    UserUpdateComponent,
    ViewIposComponent,
    CompareCompanyComponent,
    CompareSectorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
