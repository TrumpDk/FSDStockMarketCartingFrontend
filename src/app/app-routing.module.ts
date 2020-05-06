import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './components/common/user-register/user-register.component';
import { UserLoginComponent } from './components/common/user-login/user-login.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { StockExchangeComponent } from './components/admin/stock-exchange/stock-exchange.component';
import { CompanyComponent } from './components/admin/company/company.component';
import { AddStockExchangeComponent } from './components/admin/add-stock-exchange/add-stock-exchange.component';
import { AddCompanyComponent } from './components/admin/add-company/add-company.component';
import { IpoDetailsComponent } from './components/admin/ipo-details/ipo-details.component';
import { IpoEditComponent } from './components/admin/ipo-edit/ipo-edit.component';
import { ViewIposComponent } from './components/user/view-ipos/view-ipos.component';
import { ImportStockPriceComponent } from './components/admin/import-stock-price/import-stock-price.component';
import { CompareSectorComponent } from './components/user/compare-sector/compare-sector.component';
import { CompareCompanyComponent } from './components/user/compare-company/compare-company.component';


const routes: Routes = [
  //common
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  // Admin Page
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin/import', component: ImportStockPriceComponent },
  { path: 'admin/companies', component: CompanyComponent },
  { path: 'admin/add-company', component: AddCompanyComponent },
  { path: 'admin/exchanges', component: StockExchangeComponent },
  { path: 'admin/add-exchange', component: AddStockExchangeComponent },
  { path: 'admin/ipos', component: IpoDetailsComponent },
  { path: 'admin/ipos/add', component: IpoEditComponent },
  { path: 'admin/ipos/edit', component: IpoEditComponent },
  // User Page
  { path: 'user-home', component: UserHomeComponent },
  { path: 'user/ipos', component: ViewIposComponent },
  { path: 'user/compare-company', component: CompareCompanyComponent},
  { path: 'user/compare-sector', component: CompareSectorComponent },
  { path: 'user/update', component: UserUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
