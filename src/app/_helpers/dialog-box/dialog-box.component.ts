import { Component, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TransactionService } from "../../_services/transaction.service";
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
    "Product_Name",
    "Product_Barcode",
    "Product_Quantity",
    "Product_Free_Quantity"
  ];

  constructor(
    private trans: TransactionService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    console.log(this.local_data);
    this.fetchSalesDetails(this.local_data);
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }

  fetchSalesDetails(data) {
    this.trans.fetchSalesDetails(data).subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
