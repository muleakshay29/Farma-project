import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AccountMasterComponent } from "./account-master/account-master.component";
import { AuthGuard } from "../_guards/auth.guard";
import { Role } from "../_models/role";

const routes: Routes = [
  {
    path: "account-master",
    component: AccountMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
