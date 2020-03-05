import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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
export class MasterServiceService {
  API_URL = `https://ak-mead-test-heroku.herokuapp.com/`;

  constructor(private http: HttpClient) {}

  addCommonMaster(data: any): Observable<any> {
    const URL = `${this.API_URL}add-commonmaster`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addCommonMaster")));
  }

  getItemCount(customURL): Observable<any> {
    const URL = `${this.API_URL}${customURL}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("getItemCount")));
  }

  fetchCommonMaster(pageIndex: number = 1, pageSize: number): Observable<any> {
    const URL = `${this.API_URL}fetch-commonmaster`;
    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchCommonMaster")));
  }

  findCommonMaster(data: any): Observable<any> {
    const URL = `${this.API_URL}find-cmname`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("findCommonMaster")));
  }

  deleteCommonMaster(cmId): Observable<any> {
    const URL = `${this.API_URL}commonmaster/${cmId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteCommonMaster")));
  }

  fetchCommonMasterDetails(cmId): Observable<any> {
    const URL = `${this.API_URL}fetch-commonmaster-details/${cmId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterDetails")));
  }

  updateCommonMaster(id, data): Observable<any> {
    const URL = `${this.API_URL}update-commonmaster/${id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateCommonMaster")));
  }

  /* Common Master Child */
  addCommonMasterChild(data: any): Observable<any> {
    const URL = `${this.API_URL}add-commonmaster-child`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addCommonMasterChild")));
  }

  fetchCommonMasterChild(
    pageIndex: number = 1,
    pageSize: number
  ): Observable<any> {
    const URL = `${this.API_URL}fetch-commonmaster-child`;
    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchCommonMasterChild")));
  }

  findCommonMasterChild(data: any): Observable<any> {
    const URL = `${this.API_URL}find-cmcname`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("findCommonMasterChild")));
  }

  deleteCommonMasterChild(cmcId): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/${cmcId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteCommonMasterChild")));
  }

  fetchCommonMasterChildDetails(cmcId): Observable<any> {
    const URL = `${this.API_URL}fetch-commonmasterchild-details/${cmcId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterChildDetails")));
  }

  updateCommonMasterChild(id, data): Observable<any> {
    const URL = `${this.API_URL}update-commonmaster-child/${id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateCommonMasterChild")));
  }
  /* Common Master Child */

  fetchCommonChildFromCM(CM_Id): Observable<any> {
    const URL = `${this.API_URL}fetch-commonchild-fromCM/${CM_Id}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterChild")));
  }

  /* Employee Master */
  addEmployeeMaster(data: any): Observable<any> {
    const URL = `${this.API_URL}add-employee`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addEmployeeMaster")));
  }

  fetchEmployee(pageIndex: number = 1, pageSize: number): Observable<any> {
    const URL = `${this.API_URL}fetch-employee`;
    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchEmployee")));
  }

  findEmployee(data: any): Observable<any> {
    const URL = `${this.API_URL}find-employee`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("findEmployee")));
  }

  deleteEmployee(id): Observable<any> {
    const URL = `${this.API_URL}employee-master/${id}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteEmployee")));
  }

  employeePhotoUpload(data: any): Observable<any> {
    const URL = `${this.API_URL}employee-avatar-upload`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("employeePhotoUpload")));
  }

  fetchEmployeeDetails(_id): Observable<any> {
    const URL = `${this.API_URL}fetch-employee-details/${_id}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchEmployeeDetails")));
  }

  updateEmployee(id, data): Observable<any> {
    const URL = `${this.API_URL}update-employee/${id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateEmployee")));
  }
  /* Employee Master */

  checkcmname(CM_Name: string, _id: string): Observable<any> {
    const data = { CM_Name: CM_Name, cmId: _id };
    const URL = `${this.API_URL}check-cmname`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("checkcmname")));
  }

  checkcmcname(CMC_Name: string, _id: string): Observable<any> {
    const data = { CMC_Name: CMC_Name, cmcId: _id };
    const URL = `${this.API_URL}check-cmcname`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("checkcmcname")));
  }

  checkempcode(Emp_code: string, _id: string): Observable<any> {
    const data = { Emp_code: Emp_code, empId: _id };
    const URL = `${this.API_URL}check-employeecode`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("checkempcode")));
  }

  //*** supplier master */

  addSupplier(data: any): Observable<any> {
    const URL = `${this.API_URL}add-suppliers`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addSupplier")));
  }

  fetchAllSuppliers(): Observable<any> {
    const URL = `${this.API_URL}fetch-suppliers`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchAllSuppliers")));
  }

  fetchSuppliers(pageIndex: number = 1, pageSize: number): Observable<any> {
    const URL = `${this.API_URL}fetch-suppliers`;
    return this.http
      .get<any>(URL, {
        params: new HttpParams()
          .set("pageIndex", pageIndex.toString())
          .set("pageSize", pageSize.toString())
      })
      .pipe(catchError(this.handleError<any>("fetchSuppliers")));
  }

  findSupplier(data: any): Observable<any> {
    const URL = `${this.API_URL}find-supplier`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("findSupplier")));
  }

  deleteSupplier(_id): Observable<any> {
    const URL = `${this.API_URL}supplier-master/${_id}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteSupplier")));
  }

  fetchSupplierDetails(_id): Observable<any> {
    const URL = `${this.API_URL}supplier-details/${_id}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSupplierDetails")));
  }

  updateSupplier(_id, data): Observable<any> {
    const URL = `${this.API_URL}update-supplier/${_id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateSupplier")));
  }

  checkSupplierCode(SUP_code: string, _id: string): Observable<any> {
    const data = { SUP_code: SUP_code, supId: _id };
    const URL = `${this.API_URL}check-supplier-code`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("checkSupplierCode")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
