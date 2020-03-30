import { Component, Inject, Optional, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TransactionService } from "../../_services/transaction.service";
import { StocksService } from "../../_services/stocks.service";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html"
})
export class DialogBoxComponent implements OnInit {
  action: string;
  local_data: any;
  public sales: FormGroup;
  public ProdList: FormArray;
  productBatch = [];
  productExpiryDate: Date = null;
  purchaseOrderDetails = [];
  returnedArray: any[];
  d;

  constructor(
    private trans: TransactionService,
    private stocks: StocksService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;

    if (this.local_data.salesPurchaseFlag == 2) {
      this.fetchSalesDetails(this.local_data);
      // this.fetchProductBatch(this.local_data.PRO_ID);
    } else {
      this.fetchPurchaseDetails(this.local_data.id);
    }
  }

  ngOnInit() {
    this.d = new Date();

    this.sales = this.fb.group({
      InvoiceDate: [this.d],
      ProductList: this.fb.array([this.createProduct()])
    });

    this.ProdList = this.sales.get("ProductList") as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      Product_id: [""],
      Product_Batch: [""],
      Product_Expiry: [""],
      Product_MRP: [""],
      Product_Purchase_Rate: [""],
      Product_Sale_Rate: [""]
    });
  }

  get InvoiceDate() {
    return this.sales.get("InvoiceDate");
  }

  get prodFormGroup() {
    return this.sales.get("ProductList") as FormArray;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }

  fetchSalesDetails(data) {
    this.trans.fetchSalesDetails(data).subscribe(result => {
      this.returnedArray = result;

      result.forEach(element => {
        this.stocks
          .fetchProductBatch(element.Product_id._id)
          .subscribe(batch => {
            console.log(batch);
          });
      });
    });
  }

  fetchProductBatch(PRO_ID) {
    this.stocks.fetchProductBatch(PRO_ID).subscribe(batch => {
      this.productBatch = batch;
    });
    return this.productBatch;
  }

  fetchPurchaseDetails(PurchaseTransId) {
    const data = {
      PurchaseTransId
    };
    this.trans.purchaseOrderDetails(data).subscribe(result => {
      // console.log(result);
      this.purchaseOrderDetails = result;
    });
  }

  getExpiry(event) {
    const bID = event.target.value;

    this.productBatch.findIndex(item => {
      if (item.PRO_Batch === bID) {
        this.productExpiryDate = null;
        this.productExpiryDate = item.PRO_Expiry;
        return true;
      }
    });
  }
}
