import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { AlertService } from "../../../_services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductMasterService } from "../../../_services/product-master.service";
import { TransactionService } from "../../../_services/transaction.service";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html"
})
export class AddOrderComponent implements OnInit {
  public purchase: FormGroup;
  allProduct: any[];
  selectedProduct: any;
  public ProdList: FormArray;
  public TodayDate: any;
  productSchemeList: any;
  readonly: boolean = false;
  itemScheme = [];
  allSuppliers: [];
  d;
  showSpinner: boolean = false;
  loggedInUser: any;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private pservice: ProductMasterService,
    private transervice: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.d = new Date();

    this.purchase = this.fb.group({
      InvoiceDate: [this.d],
      SupplierID: ["", Validators.required],
      ProductList: this.fb.array([this.createProduct()])
    });

    this.ProdList = this.purchase.get("ProductList") as FormArray;
    this.fetchSuppliers();

    this.loggedInUser = this.auth.currentUserValue.user;
  }

  get prodFormGroup() {
    return this.purchase.get("ProductList") as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      Product_id: [""],
      Product_Name: ["", Validators.required],
      Product_Scheme: [""],
      Product_Quantity: ["", Validators.required],
      Product_Free_Quantity: ["", Validators.required]
    });
  }

  get InvoiceDate() {
    return this.purchase.get("InvoiceDate");
  }

  get SupplierID() {
    return this.purchase.get("SupplierID");
  }

  addProduct() {
    this.ProdList.push(this.createProduct());
  }

  // remove product from group
  removeContact(index) {
    this.ProdList.removeAt(index);
  }

  onSubmit() {
    this.showSpinner = true;
    const formData = this.purchase.value;
    const schemeProductList = formData.ProductList;

    const transData = {
      InvoiceDate: formData.InvoiceDate,
      PurchaseFlag: 1,
      SupplierID: formData.SupplierID,
      Created_By: this.loggedInUser._id
    };

    this.transervice.addPurchase(transData).subscribe(data => {
      if (data != null) {
        schemeProductList.forEach(element => {
          const transSchemeData = {
            InvoiceDate: formData.InvoiceDate,
            PurchaseTransId: data._id,
            Product_id: element.Product_id,
            Product_Name: element.Product_Name,
            Product_Scheme: element.Product_Scheme,
            Product_Quantity: element.Product_Quantity,
            Product_Free_Quantity: element.Product_Free_Quantity,
            Created_By: this.loggedInUser._id
          };

          this.transervice.addTransactionChild(transSchemeData).subscribe();
        });

        this.alertService.openSnackBar("Order Placed Successfuly");
        while (this.ProdList.length) {
          this.ProdList.removeAt(0);
        }
        this.purchase.reset();
        this.router.navigate(["/order"]);
        this.showSpinner = false;
      } else {
        this.alertService.openSnackBar("Error Ordering");
        this.showSpinner = false;
      }
    });
  }

  fetchSuppliers() {
    this.showSpinner = true;
    this.masterservice.fetchAllSuppliers().subscribe(allSuppliers => {
      this.allSuppliers = allSuppliers;
      this.showSpinner = false;
    });
  }

  findProduct(event, index) {
    const searchTxt = event.target.value;

    if (searchTxt.length >= 3) {
      this.showSpinner = true;
      this.pservice.findProduct({ PRO_Name: searchTxt }).subscribe(result => {
        this.allProduct = result;
        this.showSpinner = false;
      });
    }
  }

  onSelect(value, index) {
    this.getProdFormGroup(index).controls["Product_Name"].patchValue(
      value.PRO_Name
    );
    this.fetchProductSchemes(value._id, index);
  }

  getProdFormGroup(index): FormGroup {
    const formGroup = this.ProdList.controls[index] as FormGroup;
    return formGroup;
  }

  fetchProductSchemes(productID, index) {
    this.showSpinner = true;
    this.transervice.fetchProductSchemes(productID).subscribe(proSchemes => {
      this.productSchemeList = proSchemes;
      this.showSpinner = false;
    });
  }

  onSchemeSelect(event, index) {
    const selectedScheme = event.target.value;
    const data = this.productSchemeList.find(element => {
      return element["_id"] === selectedScheme;
    });

    this.getProdFormGroup(index).controls["Product_id"].patchValue(
      data["PRO_ID"]
    );
    this.getProdFormGroup(index).controls["Product_Quantity"].patchValue(
      data["Quantity"]
    );
    this.getProdFormGroup(index).controls["Product_Free_Quantity"].patchValue(
      data["Free_Quantity"]
    );
    return true;
  }

  onCancel() {
    /* while (this.ProdList.length) {
      this.ProdList.removeAt(0);
    }
    this.purchase.reset(); */

    this.router.navigate(["/order"]);
  }
}
