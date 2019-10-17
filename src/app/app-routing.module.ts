import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./_guards/auth.guard";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { PurchaseInvoiceComponent } from "./purchase-invoice/purchase-invoice.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "authentication",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "masters",
    loadChildren: "./masters/masters.module#MastersModule"
  },
  {
    path: "stocks",
    loadChildren: "./stocks/stocks.module#StocksModule"
  },
  {
    path: "invoice",
    component: PurchaseInvoiceComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
