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

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private pservice: ProductMasterService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const today_date =
      this.date.getDate() +
      "-" +
      this.date.getMonth() +
      "-" +
      this.date.getFullYear();

    this.purchase = this.fb.group({
      InvoiceDate: [today_date],
      InvoiceNo: ["", [Validators.required, Validations.numberPattern]],
      SubTotal: ["", [Validators.required, Validations.floatnumberPattern]],
      CGST: [""],
      SGST: [""],
      IGST: [""],
      Total: ["", Validators.required],
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
      itemName: [""],
      itemQty: [""],
      itemPrice: [""]
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

  get InvoiceNo() {
    return this.purchase.get("InvoiceNo");
  }
  get SubTotal() {
    return this.purchase.get("SubTotal");
  }
  get CGST() {
    return this.purchase.get("CGST");
  }
  get SGST() {
    return this.purchase.get("SGST");
  }
  get IGST() {
    return this.purchase.get("IGST");
  }

  get Total() {
    return this.purchase.get("Total");
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

    this.getProdFormGroup(index).controls["itemPrice"].setValue(
      this.selectedProduct.PRO_Price
    );

    console.log(this.getProdFormGroup(index).controls["itemPrice"].value);
  }

  getProdFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.ProdList.controls[index] as FormGroup;
    return formGroup;
  }

  getsubtotal() {
    let all_item = this.purchase.controls.ProdList.value;

    if (all_item.length > 0) {
      // console.log(all_item[0].itemPrice);
      let count_subTotal = Number(
        Object.values(all_item).reduce(
          (t, { itemPrice }) => Number(t) + Number(itemPrice),
          0
        )
      );
      // this.purchase.controls.SubTotal.setValue(count_subTotal);
    }
  }

  gettotal() {
    let IGST = this.purchase.controls.IGST.value;
    let SGST = this.purchase.controls.SGST.value;
    let CGST = this.purchase.controls.CGST.value;
    let SubTotal = this.purchase.controls.SubTotal.value;

    let orderTotal =
      Number(IGST) + Number(SGST) + Number(CGST) + Number(SubTotal);
    this.purchase.controls.Total.setValue(orderTotal);
  }

  onCancel() {
    this.router.navigate(["/invoice"]);
  }
}
