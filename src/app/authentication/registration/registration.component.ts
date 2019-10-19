import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../_services/authentication.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { Validations } from "../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { formatDate } from "ngx-bootstrap";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  typeOfUse = [];
  businessType = [];
  userTypes = [];
  alerts: any[] = [];

  constructor(
    private auth: AuthenticationService,
    private master: MasterServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      R_BusinessName: ["", Validators.required],
      R_UserName: ["", Validators.required],
      R_EmailId: ["", [Validators.required, Validators.email]],
      R_Password: ["", [Validators.required, Validations.passwordValidator]],
      Confirm_password: ["", Validators.required],
      R_TypeOfUse: ["", Validators.required],
      R_BizType: ["", Validators.required],
      R_UserType: ["", Validators.required]
    });

    this.fetchCommonMaster("5da8128075c9ae635c147dab");
    this.fetchCommonMaster("5da8126775c9ae635c147da9");
    this.fetchCommonMaster("5da8127175c9ae635c147daa");
  }

  get R_BusinessName() {
    return this.registerForm.get("R_BusinessName");
  }

  get R_UserName() {
    return this.registerForm.get("R_UserName");
  }

  get R_EmailId() {
    return this.registerForm.get("R_EmailId");
  }

  get R_Password() {
    return this.registerForm.get("R_Password");
  }

  get Confirm_password() {
    return this.registerForm.get("Confirm_password");
  }

  get R_TypeOfUse() {
    return this.registerForm.get("R_TypeOfUse");
  }

  get R_BizType() {
    return this.registerForm.get("R_BizType");
  }

  get R_UserType() {
    return this.registerForm.get("R_UserType");
  }

  register() {
    const formData = this.registerForm.value;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDay();
    const hours = currentDate.getHours();
    const miliseconds = currentDate.getMilliseconds();

    // let R_code = 'CODE_' + new Date().getUTCMilliseconds();
    // let R_code = year + "" + month + "" + day + "" + hours + "" + miliseconds;

    const insertData = {
      R_BusinessName: formData.R_BusinessName,
      R_UserName: formData.R_UserName,
      R_EmailId: formData.R_EmailId,
      R_Password: formData.R_Password,
      R_TypeOfUse: formData.R_TypeOfUse,
      R_BizType: formData.R_BizType,
      R_UserType: formData.R_UserType
    };

    if (formData.R_Password !== formData.Confirm_password) {
      this.alertService.openSnackBar(
        "Confirm password should be same as Password"
      );
    } else {
      this.auth.register(insertData).subscribe(result => {
        console.log(result);
        if (result != null) {
          this.registerForm.reset();
          this.alertService.openSnackBar("Registration is successful");
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 3000);
        } else {
          this.alertService.openSnackBar(
            "There is some error in registration. Please check the information and try again."
          );
        }
      });
    }
  }

  fetchCommonMaster(CM_Id) {
    this.master.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      if (CM_Id == "5da8126775c9ae635c147da9") {
        this.typeOfUse = list;
      }

      if (CM_Id == "5da8127175c9ae635c147daa") {
        this.businessType = list;
      }

      if (CM_Id == "5da8128075c9ae635c147dab") {
        this.userTypes = list;
        /* this.userTypes = this.userTypes.filter(function(e) {
          return e.CMC_Name != "Admin";
        }); */
      }
    });
  }
}
