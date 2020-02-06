import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";
import { AlertService } from "../../../_services/alert.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Validations } from "../../../_helpers/validations";
import { DeleteConfirmationComponent } from "../../../_helpers/delete-confirmation/delete-confirmation.component";
import { checkSupplierCode } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-supplier",
  templateUrl: "./add-supplier.component.html"
})
export class AddSupplierComponent implements OnInit {
  supplierMaster: FormGroup;
  supplierList = [];
  supId: any;
  editMode = false;
  buttonText: string;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe((params: Params) => {
      this.supId = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;

      this.initForm();

      this.buttonText = this.editMode ? "Update" : "Create";

      /* this.SUP_code.setAsyncValidators(
        checkSupplierCode(this.masterservice, this.supId)
      ); */
    });
  }

  createForm() {
    this.supplierMaster = this.fb.group({
      SUP_code: [{ value: "", disabled: true }],
      SUP_CompanyName: [
        "",
        [Validators.required, Validations.alphaNumericPattern]
      ],
      SUP_Address: [""],
      SUP_ContactNumber1: [
        "",
        [
          Validators.required,
          // Validations.floatnumberPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      SUP_ContactNumber2: [
        "",
        [
          Validators.required,
          // Validations.floatnumberPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      SUP_OwnerName: ["", Validators.required],
      SUP_GSTNumber: [
        "",
        [Validators.required, Validations.characterNumberPattern]
      ],
      SUP_DrNo: ["", [Validators.required, Validations.characterNumberPattern]],
      SUP_PanNo: ["", Validations.characterNumberPattern],
      SUP_BizMailId: ["", [Validators.required, Validators.email]],
      SUP_WhatsappNumber: [
        "",
        [
          Validators.required,
          // Validations.floatnumberPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      SUP_Dist: [""],
      SUP_City: [""],
      SUP_Pin: [""],
      SUP_State: [""]
    });
  }

  get SUP_code() {
    return this.supplierMaster.get("SUP_code");
  }
  get SUP_CompanyName() {
    return this.supplierMaster.get("SUP_CompanyName");
  }
  get SUP_Address() {
    return this.supplierMaster.get("SUP_Address");
  }
  get SUP_ContactNumber1() {
    return this.supplierMaster.get("SUP_ContactNumber1");
  }
  get SUP_ContactNumber2() {
    return this.supplierMaster.get("SUP_ContactNumber2");
  }
  get SUP_OwnerName() {
    return this.supplierMaster.get("SUP_OwnerName");
  }
  get SUP_GSTNumber() {
    return this.supplierMaster.get("SUP_GSTNumber");
  }
  get SUP_DrNo() {
    return this.supplierMaster.get("SUP_DrNo");
  }
  get SUP_PanNo() {
    return this.supplierMaster.get("SUP_PanNo");
  }
  get SUP_BizMailId() {
    return this.supplierMaster.get("SUP_BizMailId");
  }
  get SUP_WhatsappNumber() {
    return this.supplierMaster.get("SUP_WhatsappNumber");
  }
  get SUP_State() {
    return this.supplierMaster.get("SUP_State");
  }
  get SUP_Dist() {
    return this.supplierMaster.get("SUP_Dist");
  }
  get SUP_City() {
    return this.supplierMaster.get("SUP_City");
  }
  get SUP_Pin() {
    return this.supplierMaster.get("SUP_Pin");
  }

  onSubmit() {
    if (!this.editMode) {
      const formData = this.supplierMaster.value;
      delete formData.SUP_code;
      this.masterservice.addSupplier(formData).subscribe(e => {
        if (e > 0) {
          this.alertService.openSnackBar("Record added successfuly");
          this.supplierMaster.reset();
          this.router.navigate(["/supplier-master"]);
        } else {
          this.alertService.openSnackBar("Error adding record");
        }
      });
    } else {
      const formData = {
        // SUP_code: this.SUP_code.value,
        SUP_CompanyName: this.SUP_CompanyName.value,
        SUP_Address: this.SUP_Address.value,
        SUP_ContactNumber1: this.SUP_ContactNumber1.value,
        SUP_ContactNumber2: this.SUP_ContactNumber2.value,
        SUP_OwnerName: this.SUP_OwnerName.value,
        SUP_GSTNumber: this.SUP_GSTNumber.value,
        SUP_DrNo: this.SUP_DrNo.value,
        SUP_PanNo: this.SUP_PanNo.value,
        SUP_BizMailId: this.SUP_BizMailId.value,
        SUP_WhatsappNumber: this.SUP_WhatsappNumber.value,
        SUP_Dist: this.SUP_Dist.value,
        SUP_City: this.SUP_City.value,
        SUP_Pin: this.SUP_Pin.value,
        SUP_State: this.SUP_State.value
      };

      this.masterservice
        .updateSupplier(this.supId, formData)
        .subscribe(data => {
          if (data != null) {
            this.alertService.openSnackBar("Record updated successfuly");
            this.router.navigate(["/supplier-master"]);
          } else {
            this.alertService.openSnackBar("Error updating record");
          }
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.masterservice.fetchSupplierDetails(this.supId).subscribe(details => {
        this.supplierMaster.setValue({
          SUP_code: details._id,
          SUP_CompanyName: details.SUP_CompanyName,
          SUP_Address: details.SUP_Address,
          SUP_ContactNumber1: details.SUP_ContactNumber1,
          SUP_ContactNumber2: details.SUP_ContactNumber2,
          SUP_OwnerName: details.SUP_OwnerName,
          SUP_GSTNumber: details.SUP_GSTNumber,
          SUP_DrNo: details.SUP_DrNo,
          SUP_PanNo: details.SUP_PanNo,
          SUP_BizMailId: details.SUP_BizMailId,
          SUP_WhatsappNumber: details.SUP_WhatsappNumber,
          SUP_State: details.SUP_State,
          SUP_Dist: details.SUP_Dist,
          SUP_City: details.SUP_City,
          SUP_Pin: details.SUP_Pin
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(["/supplier-master"]);
  }
}
