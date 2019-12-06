import { NgModule } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { AccountMasterComponent } from "./account-master/account-master.component";
import { PurchaseComponent } from './purchase/purchase.component';
import { SchemaMasterComponent } from './schema-master/schema-master.component';
import { AddSchemaComponent } from './schema-master/add-schema/add-schema.component';

@NgModule({
  declarations: [AccountMasterComponent, PurchaseComponent, SchemaMasterComponent, AddSchemaComponent],
  imports: [SharedModule, TransactionsRoutingModule]
})
export class TransactionsModule {}
