import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductMasterService } from "../../_services/product-master.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";
import { StocksService } from "../../_services/stocks.service";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-common-stock-trans",
  templateUrl: "./common-stock-trans.component.html"
})
export class CommonStockTransComponent implements OnInit {
  stockTrans: FormGroup;
  allProductList = [];
  filteredOptions: Observable<any>;
  date = new Date();
  d: number;
  m: number;
  y: number;
  today: any;
  Stock_type: number;

  constructor(
    private fb: FormBuilder,
    private pservice: ProductMasterService,
    private sservice: StocksService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchAllProducts();

    this.stockTrans = this.fb.group({
      Invoice_no: ["123"],
      Product: ["", Validators.required],
      PRO_code: [""],
      PRO_batch: ["", Validators.required],
      PRO_purchase_unit: [""],
      PRO_sales_unit: [""]
    });

    this.d = this.date.getDate();
    this.m = this.date.getMonth() + 1;
    this.y = this.date.getFullYear();
    this.today = this.y + "-" + this.m + "-" + this.d;
  }

  get Invoice_no() {
    return this.stockTrans.get("Invoice_no");
  }

  get Product() {
    return this.stockTrans.get("Product");
  }

  get PRO_code() {
    return this.stockTrans.get("PRO_code");
  }

  get PRO_batch() {
    return this.stockTrans.get("PRO_batch");
  }

  get PRO_purchase_unit() {
    return this.stockTrans.get("PRO_purchase_unit");
  }

  get PRO_sales_unit() {
    return this.stockTrans.get("PRO_sales_unit");
  }

  onSubmit() {
    const formData = this.stockTrans.value;
    formData.Date = this.today;

    // console.log("Purchase_op_qty :" + this.Purchase_op_qty.value);
    // console.log("Sales_op_qty :" + this.Sales_op_qty.value);

    if (this.PRO_sales_unit.value === "" || this.PRO_sales_unit.value === 0) {
      this.Stock_type = 1; //Stock Type - Purchase
      // delete formData.PRO_sales_unit;
    } else {
      this.Stock_type = 2; //Stock Type - Sales
      // delete formData.PRO_purchase_unit;
    }

    // console.log("Stock_type :" + this.Stock_type);
    formData.Stock_type = this.Stock_type;
    delete formData.Product;
    console.log(formData);

    this.sservice.addCommonStockTrans(formData).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Stock added successfuly");
        this.stockTrans.reset();
        this.router.navigate(["/common-stocks"]);
      } else {
        this.alertService.openSnackBar("Error adding stock. Please try again.");
      }
    });
  }

  fetchAllProducts() {
    this.pservice.fetchProduct().subscribe(productlist => {
      this.allProductList = productlist;
    });
  }

  onSelect(event: TypeaheadMatch): void {
    // console.log(event.item);
    this.stockTrans.patchValue({
      PRO_code: event.item.PRO_code
    });
  }
}
