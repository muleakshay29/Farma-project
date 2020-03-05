import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AccountMasterComponent } from "./account-master/account-master.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { AddOrderComponent } from "./purchase/add-order/add-order.component";
import { SchemaMasterComponent } from "./schema-master/schema-master.component";
import { AddSchemaComponent } from "./schema-master/add-schema/add-schema.component";
import { SaleComponent } from "./sale/sale.component";
import { AuthGuard } from "../_guards/auth.guard";
import { Role } from "../_models/role";

const routes: Routes = [
  {
    path: "account-master",
    component: AccountMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-order",
    component: AddOrderComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "order",
    component: PurchaseComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "scheme",
    component: SchemaMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-scheme",
    component: AddSchemaComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-scheme/:id",
    component: AddSchemaComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "sales",
    component: SaleComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
