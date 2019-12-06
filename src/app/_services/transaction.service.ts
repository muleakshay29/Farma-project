import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  // API_URL = `http://localhost:3000/`;
  API_URL = `https://ak-mead-test-heroku.herokuapp.com/`;

  constructor(private http: HttpClient) {}

  addScheme(data: any): Observable<any> {
    const URL = `${this.API_URL}add-scheme`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addScheme")));
  }

  updateScheme(id, data): Observable<any> {
    const URL = `${this.API_URL}update-scheme/${id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateScheme")));
  }

  fetchScheme(): Observable<any> {
    const URL = `${this.API_URL}fetch-scheme`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchScheme")));
  }

  deleteScheme(cmId): Observable<any> {
    const URL = `${this.API_URL}scheme/${cmId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteScheme")));
  }

  fetchSchemeDetails(cmId): Observable<any> {
    const URL = `${this.API_URL}fetch-scheme-details/${cmId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSchemeDetails")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
