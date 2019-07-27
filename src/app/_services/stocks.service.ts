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
  API_URL = `http://farma.sareeline.com/FarmaAPI/public/index.php/stocks/`;

  constructor(private http: HttpClient) {}

  addCommonStockTrans(data: any): Observable<any> {
    const URL = `${this.API_URL}addstocktrans`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addCommonStockTrans")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
