import { NgModule } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { AccountMasterComponent } from "./account-master/account-master.component";
import { PurchaseComponent } from './purchase/purchase.component';

@NgModule({
  declarations: [AccountMasterComponent, PurchaseComponent],
  imports: [SharedModule, TransactionsRoutingModule]
})
export class TransactionsModule {}
