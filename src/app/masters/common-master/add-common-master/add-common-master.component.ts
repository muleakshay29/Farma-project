import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { cmnameCheckValidator } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-common-master",
  templateUrl: "./add-common-master.component.html"
})
export class AddCommonMasterComponent implements OnInit {
  commonMaster: FormGroup;
  cmID: any;
  addFlag = false;
  updateFlag = false;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.commonMaster = this.fb.group({
      CM_Name: [
        "",
        [Validators.required, Validations.alphaNumericPattern],
        cmnameCheckValidator(this.masterservice)
      ]
    });

    this.cmID = this.route.snapshot.paramMap.get("id");
    if (this.cmID == "" || this.cmID == null) {
      this.addFlag = true;
      this.updateFlag = false;
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchCommonMasterDetails();
    }
  }

  get CM_Name() {
    return this.commonMaster.get("CM_Name");
  }

  onSubmit() {
    if (this.cmID == "" || this.cmID == null) {
      const formData = this.commonMaster.value;
      this.masterservice.addCommonMaster(formData).subscribe(data => {
        if (data > 0) {
          this.alertService.openSnackBar("Record added successfuly");
          this.commonMaster.reset();
          this.router.navigate(["/common-master"]);
        } else {
          this.alertService.openSnackBar(
            "Error adding record. Please try again."
          );
        }
      });
    } else {
      const formData = {
        CM_Id: this.cmID,
        CM_Name: this.CM_Name.value
      };

      this.masterservice.updateCommonMaster(formData).subscribe(data => {
        if (data > 0) {
          this.alertService.openSnackBar("Record updated successfuly");
          this.router.navigate(["/common-master"]);
        } else {
          this.alertService.openSnackBar("Error updating record");
        }
      });
    }
  }

  fetchCommonMasterDetails() {
    this.masterservice
      .fetchCommonMasterDetails(this.cmID)
      .subscribe(details => {
        this.commonMaster.setValue({
          CM_Name: details.CM_Name
        });
      });
  }

  onCancel() {
    this.router.navigate(["/common-master"]);
  }
}
