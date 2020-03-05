import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TransactionService } from "../../../_services/transaction.service";
import { ProductMasterService } from "../../../_services/product-master.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";

@Component({
  selector: "app-add-schema",
  templateUrl: "./add-schema.component.html"
})
export class AddSchemaComponent implements OnInit {
  schemeMaster: FormGroup;
  addFlag = false;
  updateFlag = false;
  schemeID: any;
  allProduct: [];
  selectedProduct: any;
  selectedProductCode: any;
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private transservice: TransactionService,
    private pservice: ProductMasterService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.schemeMaster = this.fb.group({
      PRO_Name: ["", Validators.required],
      Quantity: ["", [Validators.required]],
      Free_Quantity: ["", [Validators.required]]
    });

    this.schemeID = this.route.snapshot.paramMap.get("id");
    if (this.schemeID == "" || this.schemeID == null) {
      this.addFlag = true;
      this.updateFlag = false;
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchSchemeDetails();
    }
  }

  get PRO_Name() {
    return this.schemeMaster.get("PRO_Name");
  }

  get Quantity() {
    return this.schemeMaster.get("Quantity");
  }

  get Free_Quantity() {
    return this.schemeMaster.get("Free_Quantity");
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

  fetchProduct() {
    this.showSpinner = true;
    this.pservice.fetchProduct().subscribe(allProduct => {
      this.allProduct = allProduct;
      this.showSpinner = false;
    });
  }

  onSelect(value) {
    this.PRO_Name.patchValue(value.PRO_Name);
    this.selectedProductCode = value._id;
  }

  fetchSchemeDetails() {
    this.showSpinner = true;
    this.transservice.fetchSchemeDetails(this.schemeID).subscribe(details => {
      this.schemeMaster.setValue({
        PRO_Name: details.PRO_ID.PRO_Name,
        Quantity: details.Quantity,
        Free_Quantity: details.Free_Quantity
      });

      this.selectedProductCode = details.PRO_ID._id;
      this.showSpinner = false;
    });
  }

  onSubmit() {
    this.showSpinner = true;
    if (this.schemeID == "" || this.schemeID == null) {
      const formData = this.schemeMaster.value;
      formData.PRO_ID = this.selectedProductCode;

      this.transservice.addScheme(formData).subscribe(data => {
        if (data !== null) {
          this.alertService.openSnackBar("Record added successfuly");
          this.schemeMaster.reset();
          this.router.navigate(["/scheme"]);
          this.showSpinner = false;
        } else {
          this.alertService.openSnackBar("Error adding record");
          this.showSpinner = false;
        }
      });
    } else {
      const formData = {
        Quantity: this.Quantity.value,
        Free_Quantity: this.Free_Quantity.value,
        PRO_ID: this.selectedProductCode
      };

      this.transservice
        .updateScheme(this.schemeID, formData)
        .subscribe(data => {
          if (data !== null) {
            this.alertService.openSnackBar("Record updated successfuly");
            this.router.navigate(["/scheme"]);
            this.showSpinner = false;
          } else {
            this.alertService.openSnackBar("Error updating record");
            this.showSpinner = false;
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(["/scheme"]);
  }
}
