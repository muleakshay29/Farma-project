import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { empCodeCheckValidator } from "../../../_helpers/unique-records.directive";
import { AuthenticationService } from "../../../_services/authentication.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html"
})
export class AddEmployeeComponent implements OnInit {
  empMaster: FormGroup;
  userTypes = [];
  currentDate: Date;
  empId: any;
  yearList = [];
  currYear: string;
  loggedInUser: any;

  editMode = false;
  buttonText: string;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.createForm();
    this.fetchCommonMaster("5da8128075c9ae635c147dab");

    this.route.params.subscribe((params: Params) => {
      this.empId = params["id"] ? params["id"] : "";
      this.editMode = params["id"] != null;

      this.initForm();

      this.buttonText = this.editMode ? "Update" : "Create";

      this.Emp_code.setAsyncValidators(
        empCodeCheckValidator(this.masterservice, this.empId)
      );
    });

    /* Get current year */
    this.fetchYear("5da8128f75c9ae635c147dad");
    this.currentDate = new Date();
    this.loggedInUser = this.auth.currentUserValue.user;
    /* Get current year */
  }

  createForm() {
    this.empMaster = this.fb.group({
      Emp_code: ["", [Validators.required]],
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
    if (!this.editMode) {
      const formData = this.empMaster.value;
      formData.Active_flag = 1;
      formData.Created_by = this.loggedInUser._id;
      formData.Created_date = this.currentDate;
      formData.Year_id = this.currYear;
      this.masterservice.addEmployeeMaster(formData).subscribe(data => {
        if (data != null) {
          const insertData = {
            R_BusinessName: this.Emp_name.value,
            R_UserName: this.User_name.value,
            R_EmailId: this.Email_id.value,
            R_Password: this.Password.value,
            R_TypeOfUse: "5da812d575c9ae635c147db1",
            R_BizType: "5da8131175c9ae635c147db6",
            R_UserType: "5da8134075c9ae635c147dbc"
          };

          this.auth.register(insertData).subscribe(result => {
            if (result != null) {
              this.alertService.openSnackBar("Record added successfuly");
              this.empMaster.reset();
              this.router.navigate(["/emp-master"]);
            } else {
              this.deleteEmployee(data._id);
              this.alertService.openSnackBar("Error adding record");
            }
          });
        } else {
          this.alertService.openSnackBar("Error adding record");
        }
      });
    } else {
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

  private initForm() {
    if (this.editMode) {
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
  }

  deleteEmployee(_id) {
    this.masterservice.deleteEmployee(_id).subscribe();
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
