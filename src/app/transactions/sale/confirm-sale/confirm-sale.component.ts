import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { TransactionService } from "../../../_services/transaction.service";
import { StocksService } from "../../../_services/stocks.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SalesDetailsComponent } from "../../../_helpers/sales-details/sales-details.component";

@Component({
  selector: "app-confirm-sale",
  templateUrl: "./confirm-sale.component.html"
})
export class ConfirmSaleComponent implements OnInit {
  id;
  d;
  Created_By;
  public ProdList: FormArray;
  public sales: FormGroup;
  productBatch = [];
  productExpiryDate: Date = null;
  purchaseOrderDetails = [];
  returnedArray: any[];
  bsModalRef: BsModalRef;
  batchList = [];
  showSpinner: boolean = false;

  constructor(
    private routes: ActivatedRoute,
    private trans: TransactionService,
    private stocks: StocksService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.routes.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.Created_By = params.get("id1");
    });
  }

  ngOnInit(): void {
    this.d = new Date();

    this.sales = this.fb.group({
      InvoiceDate: [this.d],
      ProductList: this.fb.array([])
    });

    this.ProdList = this.sales.get("ProductList") as FormArray;

    this.fetchSalesDetails();
  }

  createProduct(): FormGroup {
    return this.fb.group({
      Product_id: [""],
      Product_Name: [""],
      Product_Batch: [""],
      Product_Expiry: [""],
      Product_MRP: [""],
      Product_Purchase_Rate: [""],
      Product_Sale_Rate: [""],
      Product_CGST: [""],
      Product_SGST: [""],
      Product_IGST: [""],
      Product_GST: [""]
    });
  }

  get InvoiceDate() {
    return this.sales.get("InvoiceDate");
  }

  get prodFormGroup() {
    return this.sales.get("ProductList") as FormArray;
  }

  getProdFormGroup(index): FormGroup {
    const formGroup = this.ProdList.controls[index] as FormGroup;
    return formGroup;
  }

  fetchSalesDetails() {
    this.showSpinner = true;

    const data = {
      id: this.id,
      Created_By: this.Created_By
    };

    this.trans.fetchSalesDetails(data).subscribe(result => {
      this.returnedArray = result;

      let i = 0;
      for (const iterator of result) {
        this.ProdList.push(this.createProduct());
        this.getProdFormGroup(i).controls["Product_Name"].patchValue(
          iterator.Product_id.PRO_Name
        );

        this.fetchBatch(i, iterator.Product_id._id);

        i++;
      }

      this.showSpinner = false;
    });
  }

  fetchBatch(index, Product_id) {
    this.stocks.fetchProductBatch(Product_id).subscribe(batch => {
      let item = [];
      const key = `${index}`;

      for (const iterator of batch) {
        item.push({
          PRO_Batch: iterator.PRO_Batch
        });
      }

      this.batchList[key] = item;
    });
  }

  getExpiry(event, index) {
    this.showSpinner = true;
    const bID = event.target.value;
    const key = `${index}`;

    this.stocks.fetchBatchDetails(bID).subscribe(batchDetails => {
      console.log(batchDetails[0]);
      this.getProdFormGroup(index).controls["Product_Expiry"].patchValue(
        batchDetails[0].PRO_Expiry
      );

      this.getProdFormGroup(index).controls["Product_MRP"].patchValue(
        batchDetails[0].MRP
      );

      this.getProdFormGroup(index).controls["Product_Purchase_Rate"].patchValue(
        batchDetails[0].Purchase_Rate
      );

      this.getProdFormGroup(index).controls["Product_Sale_Rate"].patchValue(
        batchDetails[0].Sales_Rate
      );

      this.getProdFormGroup(index).controls["Product_CGST"].patchValue(
        batchDetails[0].CGST
      );

      this.getProdFormGroup(index).controls["Product_SGST"].patchValue(
        batchDetails[0].SGST
      );

      this.getProdFormGroup(index).controls["Product_IGST"].patchValue(
        batchDetails[0].IGST
      );

      this.getProdFormGroup(index).controls["Product_GST"].patchValue(
        batchDetails[0].GST
      );

      this.showSpinner = false;
    });
  }

  onSubmit() {
    // this.showSpinner = true;
    const formData = this.sales.value;
    console.log(formData);
  }

  onCancel() {
    this.router.navigate(["/sales"]);
  }
}
