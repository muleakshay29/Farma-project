import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
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
import { UniqueRecordsDirective } from './_helpers/unique-records.directive';
/** ***************************Feature Modules***************************  **/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NavigationsComponent,
    DeleteConfirmationComponent,
    UniqueRecordsDirective
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
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [DeleteConfirmationComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
