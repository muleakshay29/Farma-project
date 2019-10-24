import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { empCodeCheckValidator } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html"
})
export class AddEmployeeComponent implements OnInit {
  empMaster: FormGroup;
  userTypes = [];
  currentDate: Date;
  empId: any;
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
    this.empMaster = this.fb.group({
      Emp_code: [
        "",
        [Validators.required],
        empCodeCheckValidator(this.masterservice)
      ],
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
      Emp_pan: [
        "",
        [
          Validators.required,
          Validations.alphaNumericPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      User_name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validations.passwordValidator
        ]
      ],
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

    this.fetchCommonMaster("5da8128075c9ae635c147dab");
    this.currentDate = new Date();

    this.empId = this.route.snapshot.paramMap.get("id");
    if (this.empId == "" || this.empId == null) {
      this.addFlag = true;
      this.updateFlag = false;
    } else {
      this.addFlag = false;
      this.updateFlag = true;
    }
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
    console.log(this.empId);
    if (this.empId == "" || this.empId == null) {
      console.log("In create");
      const formData = this.empMaster.value;
      this.masterservice.addEmployeeMaster(formData).subscribe(data => {
        if (data != null) {
          this.alertService.openSnackBar("Record added successfuly");
          this.empMaster.reset();
          this.router.navigate(["/employee-master"]);
        } else {
          this.alertService.openSnackBar("Error adding record");
        }
      });
    } else {
      console.log("In update");
      console.log(this.empMaster.value);
    }
  }

  fetchCommonMaster(CM_Id) {
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.userTypes = list;
      this.userTypes = this.userTypes.filter(function(e) {
        return e._id !== "5da8133275c9ae635c147dba";
      });
    });
  }
}
