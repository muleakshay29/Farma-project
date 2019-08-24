import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { cmcnameCheckValidator } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-master-child",
  templateUrl: "./add-master-child.component.html"
})
export class AddMasterChildComponent implements OnInit {
  commonMasterChild: FormGroup;
  cmcID: any;
  addFlag = false;
  updateFlag = false;
  commonMasterList = [];

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.commonMasterChild = this.fb.group({
      CM_id: ["", Validators.required],
      CMC_Name: [
        "",
        [Validators.required, Validations.alphaNumericPattern],
        cmcnameCheckValidator(this.masterservice)
      ]
    });

    this.cmcID = this.route.snapshot.paramMap.get("id");
    if (this.cmcID == "" || this.cmcID == null) {
      this.addFlag = true;
      this.updateFlag = false;
      this.fetchCommonMaster();
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchCommonMaster();
      this.fetchCommonMasterChildDetails();
    }
  }

  get CM_id() {
    return this.commonMasterChild.get("CM_id");
  }

  get CMC_Name() {
    return this.commonMasterChild.get("CMC_Name");
  }

  onSubmit() {
    if (this.cmcID == "" || this.cmcID == null) {
      const formData = this.commonMasterChild.value;
      this.masterservice.addCommonMasterChild(formData).subscribe(data => {
        if (data > 0) {
          this.alertService.openSnackBar("Record added successfuly");
          this.commonMasterChild.reset();
          this.fetchCommonMaster();
          this.router.navigate(["/common-master-child"]);
        } else {
          this.alertService.openSnackBar("Error adding record");
        }
      });
    } else {
      const formData = {
        CMC_Id: this.cmcID,
        CM_id: this.CM_id.value,
        CMC_Name: this.CMC_Name.value
      };

      this.masterservice.updateCommonMasterChild(formData).subscribe(data => {
        if (data > 0) {
          this.alertService.openSnackBar("Record updated successfuly");
          this.router.navigate(["/common-master-child"]);
        } else {
          this.alertService.openSnackBar("Error updating record");
        }
      });
    }
  }

  fetchCommonMasterChildDetails() {
    this.masterservice
      .fetchCommonMasterChildDetails(this.cmcID)
      .subscribe(details => {
        this.commonMasterChild.setValue({
          CM_Id: details.CM_id,
          CMC_Name: details.CMC_Name
        });
      });
  }

  fetchCommonMaster() {
    this.masterservice.fetchCommonMaster().subscribe(commonMasterList => {
      this.commonMasterList = commonMasterList;
    });
  }

  onCancel() {
    this.router.navigate(["/common-master-child"]);
  }
}
