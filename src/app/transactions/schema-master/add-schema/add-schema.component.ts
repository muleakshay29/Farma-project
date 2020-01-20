import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TransactionService } from "../../../_services/transaction.service";
import { ProductMasterService } from "../../../_services/product-master.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";

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
  showSpinner: boolean = true;

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
      PRO_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
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

    this.fetchProduct();
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

  fetchProduct() {
    this.pservice.fetchProduct().subscribe(allProduct => {
      this.allProduct = allProduct;
      this.showSpinner = false;
    });
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedProduct = event.item;
    this.selectedProductCode = this.selectedProduct._id;
  }

  fetchSchemeDetails() {
    this.transservice.fetchSchemeDetails(this.schemeID).subscribe(details => {
      this.schemeMaster.setValue({
        PRO_Name: details.PRO_ID.PRO_Name,
        Quantity: details.Quantity,
        Free_Quantity: details.Free_Quantity
      });

      this.selectedProductCode = details.PRO_ID._id;
    });
  }

  onSubmit() {
    if (this.schemeID == "" || this.schemeID == null) {
      const formData = this.schemeMaster.value;
      formData.PRO_ID = this.selectedProductCode;

      this.transservice.addScheme(formData).subscribe(data => {
        if (data !== null) {
          this.alertService.openSnackBar("Record added successfuly");
          this.schemeMaster.reset();
          this.router.navigate(["/scheme"]);
        } else {
          this.alertService.openSnackBar("Error adding record");
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
          } else {
            this.alertService.openSnackBar("Error updating record");
          }
        });
    }
  }

  onCancel() {
    this.router.navigate(["/scheme"]);
  }
}
