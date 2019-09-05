import { NgModule } from '@angular/core';
import { SharedModule } from "../_shared/shared.module";

import { MastersRoutingModule } from './masters-routing.module';
import { CommonMasterComponent } from './common-master/common-master.component';
import { AddCommonMasterComponent } from './common-master/add-common-master/add-common-master.component';
import { CommonMasterChildComponent } from './common-master-child/common-master-child.component';
import { AddMasterChildComponent } from './common-master-child/add-master-child/add-master-child.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { AddProductComponent } from './product-master/add-product/add-product.component';
import { BizProductMasterComponent } from './biz-product-master/biz-product-master.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';

@NgModule({
  declarations: [
    CommonMasterComponent, 
    AddCommonMasterComponent,
    CommonMasterChildComponent,
    AddMasterChildComponent,
    ProductMasterComponent,
    AddProductComponent,
    BizProductMasterComponent,
    CustomerMasterComponent,
    EmployeeMasterComponent,
    SupplierComponent,
    AddSupplierComponent
  ],
  imports: [
    SharedModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
