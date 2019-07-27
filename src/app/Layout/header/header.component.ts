import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";
import { Role } from "../../_models/role";
import { User } from "../../_models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.R_UserType === Role.Admin;
  }

  get isPartner() {
    return this.currentUser && this.currentUser.R_UserType === Role.Partner;
  }

  get isRetailer() {
    return this.currentUser && this.currentUser.R_UserType === Role.Retailer;
  }

  ngOnInit() {
  }

}
