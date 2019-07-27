import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../_services/authentication.service";
import { first } from 'rxjs/operators';
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private alertService: AlertService,
  ) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.userLogin = this.fb.group({
      R_UserName: ['', Validators.required],
      R_Password: ['', Validators.required]
    });

    this.auth.logout();
  }

  get R_UserName() {
    return this.userLogin.get('R_UserName');
  }

  get R_Password() {
    return this.userLogin.get('R_Password');
  }

  ngSubmit() {
    const formData = this.userLogin.value;
    this.auth.login(formData)
      .pipe(first())
      .subscribe((details) => {
        if (details === false) {
          this.alertService.openSnackBar('Invalid login credentials');
        } else {
          if (details.R_IsActive == 0) {
            this.alertService.openSnackBar('Account is In-Active');
          } else {
            this.alertService.openSnackBar('Success');
            this.userLogin.reset();
            this.router.navigate(['/dashboard']);            
          }
        }
      },
        error => {
          this.alertService.openSnackBar(error);
        }
      );
  }

}
