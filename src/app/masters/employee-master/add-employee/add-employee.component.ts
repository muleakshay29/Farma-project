import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  AbstractControlOptions
} from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { empCodeCheckValidator } from "../../../_helpers/unique-records.directive";
import { AuthenticationService } from "../../../_services/authentication.service";

export interface BooleanFn {
  (): boolean;
}

export function conditionalValidator(
  predicate: BooleanFn,
  validator: ValidatorFn,
  errorNamespace?: string
): ValidatorFn {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }
    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }
    if (errorNamespace && error) {
      const customError = {};
      customError[errorNamespace] = error;
      error = customError;
    }
    return error;
  };
}

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
  yearList = [];
  currYear: string;
  loggedInUser: any;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.empMaster = this.fb.group({
      Emp_code: [
        "",
        [Validators.required],

        conditionalValidator(
          () => this.Emp_code.value,
          empCodeCheckValidator(this.masterservice),
          "illuminatiError"
        )
      ],
      Emp_name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_address: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_city: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_state: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_adhar: [
        "",
        [
          Validators.required,
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
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      Type_of_user: ["", Validators.required]
    });

    this.empMaster.valueChanges.subscribe(value => {
      this.empMaster.get("Emp_code").updateValueAndValidity();
    });

    this.fetchCommonMaster("5da8128075c9ae635c147dab");

    this.empId = this.route.snapshot.paramMap.get("id");
    if (this.empId == "" || this.empId == null) {
      this.addFlag = true;
      this.updateFlag = false;
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchEmployeeDetails();
    }

    /* Get current year */
    this.fetchYear("5da8128f75c9ae635c147dad");
    this.currentDate = new Date();
    this.loggedInUser = this.auth.currentUserValue.user;
    /* Get current year */
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
    if (this.empId == "" || this.empId == null) {
      const formData = this.empMaster.value;
      formData.Active_flag = 1;
      formData.Created_by = this.loggedInUser._id;
      formData.Created_date = this.currentDate;
      formData.Year_id = this.currYear;
      this.masterservice.addEmployeeMaster(formData).subscribe(data => {
        if (data != null) {
          this.alertService.openSnackBar("Record added successfuly");
          this.empMaster.reset();
          this.router.navigate(["/emp-master"]);
        } else {
          this.alertService.openSnackBar("Error adding record");
        }
      });
    } else {
      console.log("In update");
      console.log(this.empMaster.value);

      const formData = {
        Emp_name: this.Emp_name.value,
        Emp_address: this.Emp_address.value,
        Emp_city: this.Emp_city.value,
        Emp_state: this.Emp_state.value,
        Emp_adhar: this.Emp_adhar.value,
        Emp_pan: this.Emp_pan.value,
        User_name: this.User_name.value,
        Password: this.Password.value,
        Email_id: this.Email_id.value,
        Mobile_no: this.Mobile_no.value,
        Type_of_user: this.Type_of_user.value
      };

      this.masterservice
        .updateEmployee(this.empId, formData)
        .subscribe(data => {
          if (data != null) {
            this.alertService.openSnackBar("Record updated successfuly");
            this.router.navigate(["/emp-master"]);
          } else {
            this.alertService.openSnackBar("Error updating record");
          }
        });
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

  fetchEmployeeDetails() {
    this.masterservice.fetchEmployeeDetails(this.empId).subscribe(details => {
      this.empMaster.setValue({
        Emp_code: details.Emp_code,
        Emp_name: details.Emp_name,
        Emp_address: details.Emp_address,
        Emp_city: details.Emp_city,
        Emp_state: details.Emp_state,
        Emp_adhar: details.Emp_adhar,
        Emp_pan: details.Emp_pan,
        User_name: details.User_name,
        Password: details.Password,
        Email_id: details.Email_id,
        Mobile_no: details.Mobile_no,
        Type_of_user: details.Type_of_user
      });
    });
  }

  fetchYear(CM_Id) {
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.yearList = list;

      const year = this.currentDate.getFullYear();
      const tempYear: any = this.yearList
        .filter(ele => ele.CMC_Name === year.toString())
        .map(ele => ele._id);
      this.currYear = tempYear[0];
    });
  }

  onCancel() {
    this.router.navigate(["/emp-master"]);
  }
}
