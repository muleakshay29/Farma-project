import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../_guards/auth.guard";
import { Role } from "../_models/role";
import { CommonStockTransComponent } from "./common-stock-trans/common-stock-trans.component";
import { AddStockTransComponent } from "./common-stock-trans/add-stock-trans/add-stock-trans.component";

const routes: Routes = [
  {
    path: "",
    component: CommonStockTransComponent
  },
  {
    path: "common-stocks",
    component: CommonStockTransComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-stock-trans",
    component: AddStockTransComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {}
