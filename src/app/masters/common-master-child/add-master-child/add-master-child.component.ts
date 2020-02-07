import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { cmcnameCheckValidator } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-master-child",
  templateUrl: "./add-master-child.component.html"
})
export class AddMasterChildComponent implements OnInit {
  commonMasterChild: FormGroup;
  cmcID: any;
  commonMasterList = [];
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
    this.fetchCommonMaster();

    this.route.params.subscribe((params: Params) => {
      this.cmcID = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;

      this.initForm();

      this.buttonText = this.editMode ? "Update" : "Create";

      this.CMC_Name.setAsyncValidators(
        cmcnameCheckValidator(this.masterservice, this.cmcID)
      );
    });
  }

  createForm() {
    this.commonMasterChild = this.fb.group({
      CM_id: ["", Validators.required],
      CMC_Name: ["", [Validators.required, Validations.alphaNumericPattern]]
    });
  }

  get CM_id() {
    return this.commonMasterChild.get("CM_id");
  }

  get CMC_Name() {
    return this.commonMasterChild.get("CMC_Name");
  }

  onSubmit() {
    this.showSpinner = true;
    if (!this.editMode) {
      const formData = this.commonMasterChild.value;
      this.masterservice.addCommonMasterChild(formData).subscribe(data => {
        if (data != null) {
          this.alertService.openSnackBar("Record added successfuly");
          this.commonMasterChild.reset();
          this.fetchCommonMaster();
          this.router.navigate(["/common-master-child"]);
          this.showSpinner = false;
        } else {
          this.alertService.openSnackBar("Error adding record");
          this.showSpinner = false;
        }
      });
    } else {
      const formData = {
        CMC_Name: this.CMC_Name.value
      };

      this.masterservice
        .updateCommonMasterChild(this.cmcID, formData)
        .subscribe(data => {
          if (data != null) {
            this.alertService.openSnackBar("Record updated successfuly");
            this.router.navigate(["/common-master-child"]);
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
        .fetchCommonMasterChildDetails(this.cmcID)
        .subscribe(details => {
          this.commonMasterChild.setValue({
            CM_id: details.CM_id,
            CMC_Name: details.CMC_Name
          });
          this.showSpinner = false;
        });
    }
  }

  fetchCommonMaster() {
    this.showSpinner = true;
    this.masterservice.fetchCommonMaster(0, 0).subscribe(commonMasterList => {
      this.commonMasterList = commonMasterList;
      this.showSpinner = false;
    });
  }

  onCancel() {
    this.router.navigate(["/common-master-child"]);
  }
}
