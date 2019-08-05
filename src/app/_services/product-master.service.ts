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
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: "root"
})
export class ProductMasterService {
  // API_URL = `http://localhost/FarmaAPI/public/index.php/product-master/`;   //localhost
  API_URL = `http://farma.sareeline.com/FarmaAPI/public/index.php/product-master/`; //server

  constructor(private http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    const URL = `${this.API_URL}addproductmaster`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addproductmaster")));
  }

  productPhotoUpload(data: any): Observable<any> {
    const URL = `${this.API_URL}productphotoupload`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("productPhotoUpload")));
  }

  fetchProduct(): Observable<any> {
    const URL = `${this.API_URL}fetchproduct`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProduct")));
  }

  fetchProductDetails(pId): Observable<any> {
    const URL = `${this.API_URL}fetchproduct/${pId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProductDetails")));
  }

  updateProduct(data): Observable<any> {
    const URL = `${this.API_URL}updateproduct`;
    return this.http
      .put<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateProduct")));
  }

  deleteProduct(pId): Observable<any> {
    const URL = `${this.API_URL}deleteproduct/${pId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteProduct")));
  }

  checkProcode(PRO_code): Observable<any> {
    const URL = `${this.API_URL}checkprocode/${PRO_code}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("checkProcode")));
  }

  addBizProduct(data: any): Observable<any> {
    const URL = `${this.API_URL}addbizproduct`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addbizproduct")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
