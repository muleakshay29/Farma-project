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
  // API_URL = `http://farma.sareeline.com/FarmaAPI/public/index.php/product-master/`; //server

  API_URL = `https://ak-mead-test-heroku.herokuapp.com/`; //node server
  //API_URL = `http://localhost:3000/`; //node localhost

  constructor(private http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    const URL = `${this.API_URL}add-product`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addproductmaster")));
  }

  productPhotoUpload(data: any): Observable<any> {
    const URL = `${this.API_URL}product-image-upload`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("productPhotoUpload")));
  }

  fetchProduct(): Observable<any> {
    const URL = `${this.API_URL}fetch-products`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProduct")));
  }

  findProduct(data: any): Observable<any> {
    const URL = `http://localhost:3000/find-products`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("findProduct")));
  }

  fetchProductDetails(pId): Observable<any> {
    const URL = `${this.API_URL}fetch-product-details/${pId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProductDetails")));
  }

  updateProduct(data): Observable<any> {
    const URL = `${this.API_URL}update-product`;
    return this.http
      .put<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateProduct")));
  }

  deleteProduct(pId): Observable<any> {
    const URL = `${this.API_URL}product-master/${pId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteProduct")));
  }

  checkProcode(PRO_code): Observable<any> {
    const data = { PRO_code };
    const URL = `${this.API_URL}check-product-code`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("checkProcode")));
  }

  addBizProduct(data: any): Observable<any> {
    const URL = `${this.API_URL}add-biz-product`;
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
