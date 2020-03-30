import { Component, OnInit } from "@angular/core";
import { ProductMasterService } from "../../_services/product-master.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { StocksService } from "../../_services/stocks.service";
import { AlertService } from "../../_services/alert.service";
import { Validations } from "../../_helpers/validations";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-common-stock-trans",
  templateUrl: "./common-stock-trans.component.html"
})
export class CommonStockTransComponent implements OnInit {
  stockTrans: FormGroup;
  allProductList = [];
  filteredOptions: Observable<any>;
  typeOfProduct = [];
  invoiceNo: any = 0;
  allProduct: [];
  showSpinner: boolean = false;
  selectedProductCode: any;
  stockTypes = [];
  currentDate: Date;
  yearList = [];
  currYear: string;
  loggedInUser: any;

  constructor(
    private fb: FormBuilder,
    private pservice: ProductMasterService,
    private sservice: StocksService,
    private router: Router,
    private alertService: AlertService,
    private masterservice: MasterServiceService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.fetchCommonMaster("5da8128775c9ae635c147dac");

    this.stockTrans = this.fb.group({
      Invoice_no: [this.invoiceNo],
      Product: ["", Validators.required],
      PRO_code: [""],
      PRO_Batch: ["", [Validators.required, Validations.alphaNumericPattern]],
      PRO_Expiry: ["", Validators.required],
      PRO_Purchase_Unit: ["", Validators.required],
      PRO_purchase_unit_QTY: ["", Validators.required],
      PRO_Sales_Unit: ["", Validators.required],
      PRO_sales_unit_QTY: ["", Validators.required],
      MRP: ["", Validators.required],
      CGST: ["", Validators.required],
      SGST: ["", Validators.required],
      IGST: ["", Validators.required],
      GST: ["", Validators.required],
      Conversion_Factor: ["", Validators.required]
    });

    /* this.stockTrans.get("PRO_purchase_unit").valueChanges.subscribe(value => {
      if (!value) {
        this.stockTrans.get("PRO_purchase_unit_QTY").clearValidators();
        this.stockTrans.get("PRO_purchase_unit_QTY").updateValueAndValidity();
      } else {
        this.stockTrans
          .get("PRO_purchase_unit_QTY")
          .setValidators(Validators.required);
        this.stockTrans.get("PRO_purchase_unit_QTY").updateValueAndValidity();
      }
    });

    this.stockTrans.get("PRO_sales_unit").valueChanges.subscribe(value => {
      if (!value) {
        this.stockTrans.get("PRO_sales_unit_QTY").clearValidators();
        this.stockTrans.get("PRO_sales_unit_QTY").updateValueAndValidity();
      } else {
        this.stockTrans
          .get("PRO_sales_unit_QTY")
          .setValidators(Validators.required);
        this.stockTrans.get("PRO_sales_unit_QTY").updateValueAndValidity();
      }
    }); */

    this.generateInvoice();
    this.fetchYear("5da8128f75c9ae635c147dad");
    this.currentDate = new Date();
    this.loggedInUser = this.auth.currentUserValue.user;
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

  get PRO_Purchase_Unit() {
    return this.stockTrans.get("PRO_Purchase_Unit");
  }

  get PRO_purchase_unit_QTY() {
    return this.stockTrans.get("PRO_purchase_unit_QTY");
  }

  get PRO_Sales_Unit() {
    return this.stockTrans.get("PRO_Sales_Unit");
  }

  get PRO_sales_unit_QTY() {
    return this.stockTrans.get("PRO_sales_unit_QTY");
  }

  get MRP() {
    return this.stockTrans.get("MRP");
  }

  get CGST() {
    return this.stockTrans.get("CGST");
  }

  get SGST() {
    return this.stockTrans.get("SGST");
  }

  get IGST() {
    return this.stockTrans.get("IGST");
  }

  get GST() {
    return this.stockTrans.get("GST");
  }

  get Conversion_Factor() {
    return this.stockTrans.get("Conversion_Factor");
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

  calculateSalesQTY() {
    const salesData =
      this.PRO_purchase_unit_QTY.value * this.Conversion_Factor.value;
    this.PRO_sales_unit_QTY.setValue(salesData);
  }

  onSubmit() {
    // this.showSpinner = true;
    const formData = this.stockTrans.value;
    formData.PRO_ID = this.selectedProductCode;
    formData.Purchase_Rate = 0;
    formData.Sales_Rate = 0;
    formData.Stock_Type = 1; //Opening Balance
    formData.Stock_Type_Name = "Opening Balance";
    formData.Created_by = this.loggedInUser._id;
    formData.Created_date = this.currentDate;
    formData.Year_id = this.currYear;
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
      this.typeOfProduct = list;
      this.showSpinner = false;
    });
  }

  fetchYear(CM_Id) {
    this.showSpinner = true;
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.yearList = list;
      const year = this.currentDate.getFullYear();
      const tempYear: any = this.yearList
        .filter(ele => ele.CMC_Name === year.toString())
        .map(ele => ele._id);
      this.currYear = tempYear[0];
      this.showSpinner = false;
    });
  }
}
