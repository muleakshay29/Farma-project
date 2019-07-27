import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../_guards/auth.guard";
import { Role } from "../_models/role";

import { CommonMasterComponent } from "./common-master/common-master.component";
import { AddCommonMasterComponent } from "./common-master/add-common-master/add-common-master.component";
import { CommonMasterChildComponent } from "./common-master-child/common-master-child.component";
import { AddMasterChildComponent } from "./common-master-child/add-master-child/add-master-child.component";
import { ProductMasterComponent } from "./product-master/product-master.component";
import { AddProductComponent } from "./product-master/add-product/add-product.component";
import { BizProductMasterComponent } from "./biz-product-master/biz-product-master.component";
import { CustomerMasterComponent } from "./customer-master/customer-master.component";
import { EmployeeMasterComponent } from "./employee-master/employee-master.component";
import { SupplierComponent } from "./supplier/supplier.component";

const routes: Routes = [
  // {
  //   path: '',
  //   component: CommonMasterComponent
  // },
  {
    path: "common-master",
    component: CommonMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-common-master",
    component: AddCommonMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-common-master/:id",
    component: AddCommonMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "common-master-child",
    component: CommonMasterChildComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-common-master-child",
    component: AddMasterChildComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "add-common-master-child/:id",
    component: AddMasterChildComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "product-master",
    component: ProductMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Retailer] }
  },
  {
    path: "add-product-master",
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Retailer] }
  },
  {
    path: "add-product-master/:id",
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Retailer] }
  },
  {
    path: "add-business-product",
    component: BizProductMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "customer-master",
    component: CustomerMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "emp-master",
    component: EmployeeMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "supplier-master",
    component: SupplierComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule {}
