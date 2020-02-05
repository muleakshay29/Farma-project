import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray
} from "@angular/forms";
import { MasterServiceService } from "../../_services/master-service.service";
import { AlertService } from "../../_services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Validations } from "../../_helpers/validations";
import { ProductMasterService } from "../../_services/product-master.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";
import { TransactionService } from "../../_services/transaction.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html"
})
export class PurchaseComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private pservice: ProductMasterService,
    private transervice: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.d = new Date();

    this.purchase = this.fb.group({
      InvoiceDate: [this.d],
      SupplierID: ["", Validators.required],
      ProductList: this.fb.array([this.createProduct()])
    });

    this.ProdList = this.purchase.get("ProductList") as FormArray;
    // this.fetchProduct();
    this.fetchSuppliers();
  }

  // returns all form groups under contacts
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
    const formData = this.purchase.value;
    const schemeProductList = formData.ProductList;

    const transData = {
      InvoiceDate: formData.InvoiceDate,
      PurchaseFlag: 1,
      SupplierID: formData.SupplierID
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
            Product_Free_Quantity: element.Product_Free_Quantity
          };

          this.transervice
            .addTransactionChild(transSchemeData)
            .subscribe(dataChild => {
              console.log(dataChild);
            });
        });

        this.alertService.openSnackBar("Purchase is successfuly");
        while (this.ProdList.length) {
          this.ProdList.removeAt(0);
        }
        this.purchase.reset();
        this.router.navigate(["/purchase"]);
      } else {
        this.alertService.openSnackBar("Error ordering purchase");
      }
    });
  }

  fetchProduct() {
    this.transervice.fetchProduct().subscribe(allProduct => {
      this.allProduct = allProduct;
    });
  }

  fetchSuppliers() {
    this.masterservice.fetchSuppliers().subscribe(allSuppliers => {
      this.allSuppliers = allSuppliers;
    });
  }

  findProduct(event, index) {
    const searchTxt = event.target.value;

    if (searchTxt.length >= 3) {
      this.pservice.findProduct({ PRO_Name: searchTxt }).subscribe(result => {
        this.allProduct = result;
      });
    }
  }

  /* onSelect(event: TypeaheadMatch, index) {
    console.log(event.item);
    this.selectedProduct = event.item;
    this.fetchProductSchemes(this.selectedProduct._id, index);
  } */

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
    this.transervice.fetchProductSchemes(productID).subscribe(proSchemes => {
      this.productSchemeList = proSchemes;
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
    while (this.ProdList.length) {
      this.ProdList.removeAt(0);
    }
    this.purchase.reset();
  }
}
