import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../_guards/auth.guard";
import { Role } from "../_models/role";
import { CommonStockTransComponent } from "./common-stock-trans/common-stock-trans.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule {}
