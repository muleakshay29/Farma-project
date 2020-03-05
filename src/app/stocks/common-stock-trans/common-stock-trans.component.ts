import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductMasterService } from "../../_services/product-master.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";
import { StocksService } from "../../_services/stocks.service";
import { AlertService } from "../../_services/alert.service";
import { Validations } from "../../_helpers/validations";

@Component({
  selector: "app-common-stock-trans",
  templateUrl: "./common-stock-trans.component.html"
})
export class CommonStockTransComponent implements OnInit {
  stockTrans: FormGroup;
  allProductList = [];
  filteredOptions: Observable<any>;
  date = new Date();
  Stock_type: number;
  invoiceNo: any = 0;
  allProduct: [];
  showSpinner: boolean = false;
  selectedProductCode: any;
  stockTypes = [];
  yearID: String;

  constructor(
    private fb: FormBuilder,
    private pservice: ProductMasterService,
    private sservice: StocksService,
    private router: Router,
    private alertService: AlertService,
    private masterservice: MasterServiceService
  ) {}

  ngOnInit() {
    this.fetchCommonMaster("5e54db78fed7070017b4a01a");

    this.stockTrans = this.fb.group({
      Invoice_no: [this.invoiceNo],
      Product: ["", Validators.required],
      PRO_code: [""],
      PRO_Batch: ["", [Validators.required, Validations.alphaNumericPattern]],
      PRO_Expiry: ["", Validators.required],
      PRO_purchase_unit: [""],
      PRO_sales_unit: [""],
      Stock_Type: ["", Validators.required]
    });

    this.getYearId();
    this.generateInvoice();
  }

  get Invoice_no() {
    return this.stockTrans.get("Invoice_no");
  }

  get Product() {
    return this.stockTrans.get("Product");
  }

  get PRO_Batch() {
    return this.stockTrans.get("PRO_Batch");
  }

  get PRO_Expiry() {
    return this.stockTrans.get("PRO_Expiry");
  }

  get Stock_Type() {
    return this.stockTrans.get("Stock_Type");
  }

  get PRO_purchase_unit() {
    return this.stockTrans.get("PRO_purchase_unit");
  }

  get PRO_sales_unit() {
    return this.stockTrans.get("PRO_sales_unit");
  }

  generateInvoice() {
    this.invoiceNo = (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    ).toUpperCase();

    this.Invoice_no.patchValue(this.invoiceNo);
  }

  findProduct(event) {
    const searchTxt = event.target.value;

    if (searchTxt.length >= 3) {
      this.showSpinner = true;

      this.pservice.findProduct({ PRO_Name: searchTxt }).subscribe(result => {
        this.showSpinner = false;
        this.allProduct = result;
      });
    }
  }

  onSelect(value) {
    this.Product.patchValue(value.PRO_Name);
    this.selectedProductCode = value._id;
  }

  onSubmit() {
    this.showSpinner = true;
    const formData = this.stockTrans.value;
    formData.PRO_ID = this.selectedProductCode;
    formData.Date = this.date;
    formData.Year_id = this.yearID;
    delete formData.PRO_code;
    delete formData.Product;

    this.sservice.addCommonStockTrans(formData).subscribe(data => {
      if (data != null) {
        this.alertService.openSnackBar("Stock added successfuly");
        this.stockTrans.reset();
        this.generateInvoice();
        this.router.navigate(["/common-stocks"]);
        this.showSpinner = false;
      } else {
        this.alertService.openSnackBar("Error adding stock. Please try again.");
        this.showSpinner = false;
      }
    });
  }

  fetchCommonMaster(CM_Id) {
    this.showSpinner = true;
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.stockTypes = list;
      this.showSpinner = false;
    });
  }

  getYearId() {
    const year = this.date.getFullYear();
    this.masterservice
      .findCommonMasterChild({ CMC_Name: year })
      .subscribe(result => {
        this.yearID = result[0]._id;
      });
  }
}
