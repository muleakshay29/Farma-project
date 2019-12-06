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
  date = new Date();
  allProduct: [];
  selectedProduct: any;
  public ProdList: FormArray;
  public TodayDate: any;
  productSchemeList: [];

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
    this.TodayDate =
      this.date.getDate() +
      "-" +
      this.date.getMonth() +
      "-" +
      this.date.getFullYear();

    this.purchase = this.fb.group({
      InvoiceDate: [this.TodayDate],
      ProductList: this.fb.array([this.createProduct()])
    });

    this.ProdList = this.purchase.get("ProductList") as FormArray;
    this.fetchProduct();
  }

  // returns all form groups under contacts
  get prodFormGroup() {
    return this.purchase.get("ProductList") as FormArray;
  }

  createProduct(): FormGroup {
    return this.fb.group({
      itemName: ["", Validators.required],
      itemScheme: [""],
      itemQty: ["", Validators.required],
      itemFreeQty: ["", Validators.required]
    });
  }

  /* get itemName() {
    // return this.purchase.get("itemName");
    return this.prodFormGroup.get("itemName");
  }
  get itemQty() {
    return this.purchase.get("itemQty");
  }
  get itemPrice() {
    return this.purchase.get("itemPrice");
  } */

  get InvoiceDate() {
    return this.purchase.get("InvoiceDate");
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
    console.log(formData);
  }

  fetchProduct() {
    this.pservice.fetchProduct().subscribe(allProduct => {
      this.allProduct = allProduct;
    });
  }

  onSelect(event: TypeaheadMatch, index): void {
    this.selectedProduct = event.item;

    /* this.getProdFormGroup(index).controls["itemPrice"].setValue(
      this.selectedProduct.PRO_Price
    ); */
    this.fetchProductSchemes(this.selectedProduct._id);
  }

  getProdFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.ProdList.controls[index] as FormGroup;
    return formGroup;
  }

  fetchProductSchemes(productID) {
    this.transervice.fetchProductSchemes(productID).subscribe(proSchemes => {
      this.productSchemeList = proSchemes;
    });
  }

  onSchemeSelect(event) {
    const selectedScheme = event.target.value;
    const data = this.productSchemeList.find(element => {
      element["_id"] == selectedScheme;
      console.log(element["_id"]);
    });
    console.log(data);
  }

  onCancel() {
    this.router.navigate(["/purchase"]);
  }
}
