/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, map, delay } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = `http://localhost/FarmaAPI/public/index.php/authentication/`;
  // API_URL = `http://farma.sareeline.com/FarmaAPI/public/index.php/authentication/`;
  
  redirectUrl: string;
  currentUser$: Subject<any> = new Subject<any>();
  loggedInUser: any

  constructor(
    private http: HttpClient,
  ) { }

  login(data: any): Observable<any> {
    const URL = `${this.API_URL}login`;
    return this.http.post<{ access_token: string }>(URL, data, httpOptions)
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedCheck(user);
          return user;
        } else {
          return false;
        }
      }));
  }

  isLoggedCheck(user) {
    // this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'))
    this.currentUser$.next({
      R_UserName: user.R_UserName
    });
  }

  logout() {
    this.currentUser$.next(undefined);
    localStorage.removeItem('currentUser');
    localStorage.clear();
  }

  register(insertData): Observable<any> {
    const URL = `${this.API_URL}register`;
    return this.http.post<any>(URL, insertData, httpOptions)
    .pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_models/user";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // API_URL = `http://localhost/FarmaAPI/public/index.php/authentication/`;
  API_URL = `http://farma.sareeline.com/FarmaAPI/public/index.php/authentication/`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userData: any) {
    // const URL = `${this.API_URL}login`;
    const URL = `https://ak-mead-test-heroku.herokuapp.com/login`;

    return this.http.post<any>(URL, userData).pipe(
      map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        // if (user && user.token) {
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  register(insertData): Observable<any> {
    // const URL = `${this.API_URL}register`;
    const URL = `https://ak-mead-test-heroku.herokuapp.com/registration`;
    return this.http.post<any>(URL, insertData, httpOptions);
  }
}
