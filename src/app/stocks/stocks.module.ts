import { NgModule } from "@angular/core";
import { SharedModule } from "../_shared/shared.module";

import { StocksRoutingModule } from "./stocks-routing.module";
import { CommonStockTransComponent } from "./common-stock-trans/common-stock-trans.component";

import { StocksService } from "../_services/stocks.service";

@NgModule({
  declarations: [CommonStockTransComponent],
  imports: [SharedModule, StocksRoutingModule],
  providers: [StocksService]
})
export class StocksModule {}
