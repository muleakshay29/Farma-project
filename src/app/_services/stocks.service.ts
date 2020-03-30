import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: "root"
})
export class StocksService {
  API_URL = `http://localhost:3000/`;
  // API_URL = `https://ak-mead-test-heroku.herokuapp.com/`;

  constructor(private http: HttpClient) {}

  addCommonStockTrans(data: any): Observable<any> {
    const URL = `${this.API_URL}add-stock-trans`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addCommonStockTrans")));
  }

  fetchProductBatch(PRO_ID): Observable<any> {
    const URL = `${this.API_URL}fetch-product-batch/${PRO_ID}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProductBatch")));
  }

  fetchBatchDetails(PRO_Batch): Observable<any> {
    const URL = `${this.API_URL}find-batch-details/${PRO_Batch}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchBatchDetails")));
  }

  fetchInvoiceNo(): Observable<any> {
    const URL = `${this.API_URL}fetchinvoiceno`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchInvoiceNo")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
