import { NgModule } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { AccountMasterComponent } from "./account-master/account-master.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { SchemaMasterComponent } from "./schema-master/schema-master.component";
import { AddSchemaComponent } from "./schema-master/add-schema/add-schema.component";
import { SaleComponent } from "./sale/sale.component";
import { AddOrderComponent } from "./purchase/add-order/add-order.component";

@NgModule({
  declarations: [
    AccountMasterComponent,
    PurchaseComponent,
    SchemaMasterComponent,
    AddSchemaComponent,
    SaleComponent,
    AddOrderComponent
  ],
  imports: [SharedModule, TransactionsRoutingModule]
})
export class TransactionsModule {}
