import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { cmnameCheckValidator } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-common-master",
  templateUrl: "./add-common-master.component.html"
})
export class AddCommonMasterComponent implements OnInit {
  commonMaster: FormGroup;
  cmID: any;
  editMode = false;
  buttonText: string;
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe((params: Params) => {
      this.cmID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;

      this.initForm();

      this.buttonText = this.editMode ? "Update" : "Create";

      this.CM_Name.setAsyncValidators(
        cmnameCheckValidator(this.masterservice, this.cmID)
      );
    });
  }

  createForm() {
    this.commonMaster = this.fb.group({
      CM_Name: ["", [Validators.required, Validations.alphaNumericPattern]]
    });
  }

  get CM_Name() {
    return this.commonMaster.get("CM_Name");
  }

  onSubmit() {
    this.showSpinner = true;
    if (!this.editMode) {
      const formData = this.commonMaster.value;
      this.masterservice.addCommonMaster(formData).subscribe(data => {
        if (data != null) {
          this.alertService.openSnackBar("Record added successfuly");
          this.commonMaster.reset();
          this.router.navigate(["/common-master"]);
          this.showSpinner = false;
        } else {
          this.alertService.openSnackBar(
            "Error adding record. Please try again."
          );
          this.showSpinner = false;
        }
      });
    } else {
      const formData = {
        CM_Name: this.CM_Name.value
      };

      this.masterservice
        .updateCommonMaster(this.cmID, formData)
        .subscribe(data => {
          if (data != null) {
            this.alertService.openSnackBar("Record updated successfuly");
            this.router.navigate(["/common-master"]);
            this.showSpinner = false;
          } else {
            this.alertService.openSnackBar("Error updating record");
            this.showSpinner = false;
          }
        });
    }
  }

  private initForm() {
    if (this.editMode) {
      this.showSpinner = true;
      this.masterservice
        .fetchCommonMasterDetails(this.cmID)
        .subscribe(details => {
          this.commonMaster.setValue({
            CM_Name: details.CM_Name
          });
          this.showSpinner = false;
        });
    }
  }

  onCancel() {
    this.router.navigate(["/common-master"]);
  }
}
