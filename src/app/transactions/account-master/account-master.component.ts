import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../_services/master-service.service";
import { Validations } from "../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-account-master",
  templateUrl: "./account-master.component.html"
})
export class AccountMasterComponent implements OnInit {
  accountMaster: FormGroup;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.accountMaster = this.fb.group({
      AC_code: ["", [Validators.required, Validations.alphaNumericPattern]],
      AC_name: ["", Validators.required],
      AC_no: ["", Validators.required],
      IFSC_code: ["", Validators.required],
      AC_type: ["", Validators.required],
      Bank_name: ["", Validators.required],
      AC_opening_bal: ["", Validators.required],
      Opening_bal_type: ["", Validators.required]
    });
  }

  get AC_code() {
    return this.accountMaster.get("AC_code");
  }

  get AC_name() {
    return this.accountMaster.get("AC_name");
  }

  get AC_no() {
    return this.accountMaster.get("AC_no");
  }

  get IFSC_code() {
    return this.accountMaster.get("IFSC_code");
  }

  get AC_type() {
    return this.accountMaster.get("AC_type");
  }

  get Bank_name() {
    return this.accountMaster.get("Bank_name");
  }

  get AC_opening_bal() {
    return this.accountMaster.get("AC_opening_bal");
  }

  get Opening_bal_type() {
    return this.accountMaster.get("Opening_bal_type");
  }

  onSubmit() {
    const formData = this.accountMaster.value;
    console.log(formData);
  }
}
