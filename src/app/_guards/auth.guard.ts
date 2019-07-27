import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (
        route.data.roles &&
        route.data.roles.indexOf(currentUser.R_UserType) === -1
      ) {
        this.router.navigate(["/dashboard"]);
        return false;
      }
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  currentUser: any;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = localStorage.getItem("currentUser");
    console.log(this.currentUser.R_UserType);
    if (this.currentUser.R_UserType === "1") {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}

@Injectable()
export class PartnerGuard implements CanActivate {
  currentUser: any;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = localStorage.getItem("currentUser");
    console.log(this.currentUser.R_UserType);
    if (this.currentUser.R_UserType === "2") {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}

@Injectable()
export class RetailerGuard implements CanActivate {
  currentUser: any;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = localStorage.getItem("currentUser");
    console.log(this.currentUser.R_UserType);
    if (this.currentUser.R_UserType === "3") {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
