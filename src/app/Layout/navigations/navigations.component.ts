import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigations",
  templateUrl: "./navigations.component.html"
  // styleUrls: ['./navigations.component.css']
})
export class NavigationsComponent implements OnInit {
  loggedInUser: any;

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser = this.auth.currentUserValue.user;
    // this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  logout() {
    this.auth.logout().subscribe();
    // this.router.navigate(["/login"]);
  }
}
