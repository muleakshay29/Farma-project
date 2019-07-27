import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../_services/authentication.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { Validations } from "../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { formatDate } from 'ngx-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
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
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      Business_name: ['', Validators.required],
      User_name: ['', Validators.required],
      Email_id: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validations.passwordValidator]],
      Confirm_password: ['', Validators.required],
      Type_of_use: ['', Validators.required],
      Business_type: ['', Validators.required],
      User_type: ['', Validators.required],
    });

    this.fetchCommonMaster(1);
    this.fetchCommonMaster(2);
    this.fetchCommonMaster(3);
  }

  get Business_name() {
    return this.registerForm.get('Business_name');
  }

  get User_name() {
    return this.registerForm.get('User_name');
  }

  get Email_id() {
    return this.registerForm.get('Email_id');
  }

  get Password() {
    return this.registerForm.get('Password');
  }

  get Confirm_password() {
    return this.registerForm.get('Confirm_password');
  }

  get Type_of_use() {
    return this.registerForm.get('Type_of_use');
  }

  get Business_type() {
    return this.registerForm.get('Business_type');
  }

  get User_type() {
    return this.registerForm.get('User_type');
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
    let R_code = year + '' + month + '' + day + '' + hours + '' + miliseconds;

    const insertData = {
      R_code: R_code,
      R_BusinessName: formData.Business_name,
      R_UserName: formData.User_name,
      R_EmailId: formData.Email_id,
      R_Password: formData.Password,
      R_TypeOfUse: formData.Type_of_use,
      R_BizType: formData.Business_type,
      R_IsActive: '1',
      R_UserType: formData.User_type
    }

    if (formData.Password !== formData.Confirm_password) {
      this.addAlert('danger', 'Confirm password should be same as Password.');
    } else {
      this.auth.register(insertData)
        .subscribe((result) => {
          if (result > 0) {
            this.registerForm.reset();
            this.addAlert('success', 'Registration is successful');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            this.addAlert('danger', 'There is some error in registration. Please check the information and try again.');
          }
        });
    }
  }

  fetchCommonMaster(CM_Id) {
    this.master.fetchCommonChildFromCM(CM_Id)
      .subscribe((list) => {
        if (CM_Id == 1) {
          this.typeOfUse = list;
        }

        if (CM_Id == 2) {
          this.businessType = list;
        }

        if (CM_Id == 3) {
          this.userTypes = list;
          this.userTypes = this.userTypes.filter(function(e) {
            return e.CMC_Id > 10;
          });
        }
      });
  }

  addAlert(type, msg): void {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 3000
    });
  }

}
