import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/** ***************************Fixed Components***************************  **/
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Layout/header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NavigationsComponent } from "./Layout/navigations/navigations.component";
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { DeleteConfirmationComponent } from "./_helpers/delete-confirmation/delete-confirmation.component";
/** ***************************Fixed Components***************************  **/

/** ***************************Services***************************  **/
import { MasterServiceService } from "./_services/master-service.service";
/** ***************************Services***************************  **/

/** ***************************Feature Modules***************************  **/
import { StocksModule } from "./stocks/stocks.module";
import { MastersModule } from "./masters/masters.module";
import { SharedModule } from "./_shared/shared.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { UniqueRecordsDirective } from "./_helpers/unique-records.directive";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { DialogBoxComponent } from "./_helpers/dialog-box/dialog-box.component";
import { PaginationComponent } from './_helpers/pagination/pagination.component';
/** ***************************Feature Modules***************************  **/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NavigationsComponent,
    DeleteConfirmationComponent,
    UniqueRecordsDirective,
    DialogBoxComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MastersModule,
    SharedModule,
    AuthenticationModule,
    TransactionsModule,
    StocksModule
  ],
  providers: [
    MasterServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  entryComponents: [DeleteConfirmationComponent, DialogBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
