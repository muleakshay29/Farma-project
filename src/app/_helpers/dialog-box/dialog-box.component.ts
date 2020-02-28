import { Component, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TransactionService } from "../../_services/transaction.service";
import { StocksService } from "../../_services/stocks.service";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html"
})
export class DialogBoxComponent {
  action: string;
  local_data: any;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "ProductName",
    "Batch",
    "Expiry_Date",
    "MRP",
    "Purchase_Rate",
    "Sale_Rate"
  ];

  productBatch = [];
  productExpiryDate: Date;

  constructor(
    private trans: TransactionService,
    private stocks: StocksService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.fetchSalesDetails(this.local_data);
    this.fetchProductBatch(this.local_data.PRO_ID);
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }

  fetchSalesDetails(data) {
    this.trans.fetchSalesDetails(data).subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
    });
  }

  fetchProductBatch(PRO_ID) {
    this.stocks.fetchProductBatch(PRO_ID).subscribe(batch => {
      this.productBatch = batch;
    });
  }

  getExpiry(event) {
    const bID = event.target.value;

    var index = this.productBatch.findIndex(item => {
      if (item.PRO_Batch === bID) {
        this.productExpiryDate = null;
        this.productExpiryDate = item.PRO_Expiry;
        return item.PRO_Expiry;
      }
    });

    console.log(this.productExpiryDate);
  }
}
