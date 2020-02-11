import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
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

  addPurchase(data: any): Observable<any> {
    const URL = `${this.API_URL}add-purchase-transaction`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addPurchase")));
  }

  addTransactionChild(data: any): Observable<any> {
    const URL = `${this.API_URL}add-transaction-child`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addTransactionChild")));
  }

  fetchSalesOrder(): Observable<any> {
    const URL = `${this.API_URL}fetch-sales-order`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSalesOrder")));
  }

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

  fetchScheme(pageIndex: number = 1, pageSize: number): Observable<any> {
    const URL = `${this.API_URL}fetch-scheme`;
    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchScheme")));
  }

  findScheme(data: any): Observable<any> {
    const URL = `${this.API_URL}find-scheme`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("findScheme")));
  }

  deleteScheme(schemeID): Observable<any> {
    const URL = `${this.API_URL}scheme/${schemeID}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteScheme")));
  }

  fetchSchemeDetails(schemeID): Observable<any> {
    const URL = `${this.API_URL}fetch-scheme-details/${schemeID}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSchemeDetails")));
  }

  fetchProductSchemes(_id): Observable<any> {
    const URL = `${this.API_URL}fetch-scheme-by-product/${_id}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProductSchemes")));
  }

  fetchSalesDetails(salesData): Observable<any> {
    const URL = `${this.API_URL}fetch-sales-details`;
    return this.http
      .post<any>(URL, salesData, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSalesDetails")));
  }

  fetchProduct(): Observable<any> {
    const URL = `${this.API_URL}fetch-products-dropdown`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProduct")));
  }

  fetchProduct1(pageIndex: number = 0, pageSize: number = 10): Observable<any> {
    const URL = `http://localhost:3000/fetch-products`;

    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchProduct")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
