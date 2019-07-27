import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./_guards/auth.guard";

import { DashboardComponent } from "./dashboard/dashboard.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
