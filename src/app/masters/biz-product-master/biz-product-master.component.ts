import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProductMasterService } from "../../_services/product-master.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";
import { AlertService } from "../../_services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-biz-product-master",
  templateUrl: "./biz-product-master.component.html"
})
export class BizProductMasterComponent implements OnInit {
  bizProductMaster: FormGroup;
  productList: [];
  typeOfProduct = [];
  selectedProduct: any;
  imgURL = "../../../assets/img/images.png";

  PRO_Name: string = "";
  PRO_Barcode: string = "";
  PRO_Manufraturer: string = "";
  PRO_SGST: number = 0;
  PRO_CGST: number = 0;
  PRO_IGST: number = 0;
  PRO_CESS: number = 0;
  PRO_HSN: string = "";
  PRO_ScheduledUnder: string = "";
  PRO_Content: string = "";
  PRO_ReorderLevel: number = 0;
  PRO_Minimum_stock: number = 0;
  PRO_Type: number = 0;

  date = new Date();
  d: number;
  m: number;
  y: number;
  today: any;

  constructor(
    private fb: FormBuilder,
    private pservice: ProductMasterService,
    private masterservice: MasterServiceService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchProduct();
    this.fetchCommonMaster(4);

    this.bizProductMaster = this.fb.group({
      Product: ["", Validators.required],
      PRO_code: [""]
    });

    this.d = this.date.getDate();
    this.m = this.date.getMonth() + 1;
    this.y = this.date.getFullYear();
    this.today = this.y + "-" + this.m + "-" + this.d;
  }

  get Product() {
    return this.bizProductMaster.get("Product");
  }

  get PRO_code() {
    return this.bizProductMaster.get("PRO_code");
  }

  onSubmit() {
    const formData = this.bizProductMaster.value;
    formData.Date = this.today;
    delete formData.Product;

    this.pservice.addBizProduct(formData).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Product added successfuly");
        this.bizProductMaster.reset();
        this.router.navigate(["/add-business-product"]);
      } else {
        this.alertService.openSnackBar(
          "Error adding product. Please try again."
        );
      }
    });
  }

  fetchProduct() {
    this.pservice.fetchProduct().subscribe(productlist => {
      this.productList = productlist;
    });
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedProduct = event.item;
    this.PRO_Name = this.selectedProduct.PRO_Name;
    this.PRO_Barcode = this.selectedProduct.PRO_Barcode;
    this.PRO_Manufraturer = this.selectedProduct.PRO_Manufraturer;
    this.PRO_SGST = this.selectedProduct.PRO_SGST;
    this.PRO_CGST = this.selectedProduct.PRO_CGST;
    this.PRO_IGST = this.selectedProduct.PRO_IGST;
    this.PRO_CESS = this.selectedProduct.PRO_CESS;
    this.PRO_HSN = this.selectedProduct.PRO_HSN;
    this.PRO_ScheduledUnder = this.selectedProduct.PRO_ScheduledUnder;
    this.PRO_Content = this.selectedProduct.PRO_Content;
    this.PRO_ReorderLevel = this.selectedProduct.PRO_ReorderLevel;
    this.PRO_Minimum_stock = this.selectedProduct.PRO_Minimum_stock;
    this.PRO_Type = this.selectedProduct.PRO_Type;
    this.imgURL = this.selectedProduct.PRO_Image;

    this.bizProductMaster.patchValue({
      PRO_code: this.selectedProduct.PRO_code
    });
  }

  fetchCommonMaster(CM_Id) {
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.typeOfProduct = list;
    });
  }
}
