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
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: "root"
})
export class ProductMasterService {
  API_URL = `http://localhost:3000/`;
  // API_URL = `https://ak-mead-test-heroku.herokuapp.com/`;

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

  getProductImage(imageName): Observable<any> {
    const URL = `${this.API_URL}product-image/${imageName}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("getProductImage")));
  }

  fetchProduct(): Observable<any> {
    const URL = `${this.API_URL}fetch-products`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchProduct")));
  }

  getProductCount(): Observable<any> {
    const URL = `${this.API_URL}products-count`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("getProductCount")));
  }

  fetchProduct2(pageIndex: number = 1, pageSize: number): Observable<any> {
    const URL = `${this.API_URL}fetch-products`;
    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchProduct")));
  }

  findProduct(data: any): Observable<any> {
    const URL = `${this.API_URL}find-products`;
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

  updateProduct(_id, data): Observable<any> {
    const URL = `${this.API_URL}update-product/${_id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateProduct")));
  }

  deleteProduct(pId): Observable<any> {
    const URL = `${this.API_URL}product-master/${pId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteProduct")));
  }

  checkProcode(PRO_code: string, _id: string): Observable<any> {
    const data = { PRO_code: PRO_code, proId: _id };
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
