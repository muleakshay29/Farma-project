import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../_services/master-service.service";
import { Validations } from "../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-employee-master",
  templateUrl: "./employee-master.component.html"
})
export class EmployeeMasterComponent implements OnInit {
  empMaster: FormGroup;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.empMaster = this.fb.group({
      Emp_code: ["", Validators.required],
      Emp_name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_address: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_city: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_state: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_adhar: [
        "",
        [
          Validators.required,
          Validations.floatnumberPattern,
          Validators.minLength(12),
          Validators.maxLength(12)
        ]
      ],
      Emp_pan: ["", [Validators.required, Validations.alphaNumericPattern]],
      User_name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Password: ["", Validators.required],
      Email_id: ["", [Validators.required, Validators.email]],
      Mobile_no: [
        "",
        [
          Validators.required,
          Validations.floatnumberPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      Type_of_user: ["", Validators.required]
    });
  }

  get Emp_code() {
    return this.empMaster.get("Emp_code");
  }

  get Emp_name() {
    return this.empMaster.get("Emp_name");
  }

  get Emp_address() {
    return this.empMaster.get("Emp_address");
  }

  get Emp_city() {
    return this.empMaster.get("Emp_city");
  }

  get Emp_state() {
    return this.empMaster.get("Emp_state");
  }

  get Emp_adhar() {
    return this.empMaster.get("Emp_adhar");
  }

  get Emp_pan() {
    return this.empMaster.get("Emp_pan");
  }

  get User_name() {
    return this.empMaster.get("User_name");
  }

  get Password() {
    return this.empMaster.get("Password");
  }

  get Email_id() {
    return this.empMaster.get("Email_id");
  }

  get Mobile_no() {
    return this.empMaster.get("Mobile_no");
  }

  get Type_of_user() {
    return this.empMaster.get("Type_of_user");
  }

  onSubmit() {
    const formData = this.empMaster.value;
    console.log(formData);

    this.masterservice.addEmployeeMaster(formData).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record added successfuly");
        this.empMaster.reset();
        this.router.navigate(["/emp-master"]);
      } else {
        this.alertService.openSnackBar(
          "Error adding record. Please try again."
        );
      }
    });
  }
}
