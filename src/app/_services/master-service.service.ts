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
export class MasterServiceService {
  // API_URL = `http://localhost/FarmaAPI/public/index.php/masters/`;   //localhost
  // API_URL = `http://farma.sareeline.com/FarmaAPI/public/index.php/masters/`; //server
  API_URL = `https://ak-mead-test-heroku.herokuapp.com/`; //Node server

  constructor(private http: HttpClient) {}

  addCommonMaster(data: any): Observable<any> {
    // const URL = `${this.API_URL}commonmaster/addcommonmaster`;
    const URL = `${this.API_URL}add-commonmaster`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addCommonMaster")));
  }

  fetchCommonMaster(): Observable<any> {
    // const URL = `${this.API_URL}commonmaster/fetchcommonmaster`;
    const URL = `${this.API_URL}fetch-commonmaster`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMaster")));
  }

  deleteCommonMaster(cmId): Observable<any> {
    // const URL = `${this.API_URL}commonmaster/deletecommonmaster/${cmId}`;
    const URL = `${this.API_URL}commonmaster/${cmId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteCommonMaster")));
  }

  fetchCommonMasterDetails(cmId): Observable<any> {
    // const URL = `${this.API_URL}commonmaster/fetchcommonmaster/${cmId}`;
    const URL = `${this.API_URL}fetch-commonmaster-details/${cmId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterDetails")));
  }

  updateCommonMaster(id, data): Observable<any> {
    // const URL = `${this.API_URL}commonmaster/updatecommonmaster`;
    const URL = `${this.API_URL}update-commonmaster/${id}`;
    return this.http
      .patch<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateCommonMaster")));
  }

  /* Common Master Child */
  addCommonMasterChild(data: any): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/addcommonmasterchild`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addCommonMasterChild")));
  }

  fetchCommonMasterChild(): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/fetchcommonmasterchild`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterChild")));
  }

  deleteCommonMasterChild(cmcId): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/deletecommonmasterchild/${cmcId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteCommonMasterChild")));
  }

  fetchCommonMasterChildDetails(cmcId): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/fetchcommonmasterchild/${cmcId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterChildDetails")));
  }

  updateCommonMasterChild(data): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/updatecommonmasterchild`;
    return this.http
      .put<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateCommonMasterChild")));
  }
  /* Common Master Child */

  fetchCommonChildFromCM(CM_Id): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/fetchCommonChildFromCM/${CM_Id}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchCommonMasterChild")));
  }

  /* Employee Master */
  addEmployeeMaster(data: any): Observable<any> {
    // const URL = `${this.API_URL}employee-master/addempmaster`;
    const URL = `${this.API_URL}add-employee`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addEmployeeMaster")));
  }

  employeePhotoUpload(data: any): Observable<any> {
    const URL = `${this.API_URL}employee-avatar-upload`;
    // const URL = `http://localhost:3000/employee-avatar-upload`;
    return this.http
      .post<any>(URL, data)
      .pipe(catchError(this.handleError<any>("employeePhotoUpload")));
  }
  /* Employee Master */

  checkcmname(CM_Name): Observable<any> {
    const data = { CM_Name: CM_Name };
    const URL = `${this.API_URL}check-cmname`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("checkcmname")));
  }

  /* checkcmname(CM_Name): Observable<any> {
    const URL = `${this.API_URL}commonmaster/checkcmname/${CM_Name}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("checkcmname")));
  } */

  checkcmcname(CMC_Name): Observable<any> {
    const URL = `${this.API_URL}commonmasterchild/checkcmcname/${CMC_Name}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("checkcmcname")));
  }

  checkempcode(Emp_code): Observable<any> {
    const URL = `${this.API_URL}employee-master/checkempname/${Emp_code}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("checkempcode")));
  }

  //*** supplier master */

  addSupplier(data: any): Observable<any> {
    // const URL = `${this.API_URL}suppliermaster/addsupplier`;
    const URL = `https://ak-mead-test-heroku.herokuapp.com/add-suppliers`;
    return this.http
      .post<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("addSupplier")));
  }

  fetchSuppliers(): Observable<any> {
    // const URL = `${this.API_URL}suppliermaster/fetchsupplier`;
    const URL = `https://ak-mead-test-heroku.herokuapp.com/fetch-suppliers`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSuppliers")));
  }

  deleteSupplier(cmcId): Observable<any> {
    const URL = `${this.API_URL}suppliermaster/deletesupplier/${cmcId}`;
    return this.http
      .delete<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("deleteSupplier")));
  }

  fetchSupplierDetails(cmcId): Observable<any> {
    const URL = `${this.API_URL}suppliermaster/fetchsupdetails/${cmcId}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("fetchSupplierDetails")));
  }

  updateSupplier(data): Observable<any> {
    const URL = `${this.API_URL}suppliermaster/updatesupplier`;
    return this.http
      .put<any>(URL, data, httpOptions)
      .pipe(catchError(this.handleError<any>("updateSupplier")));
  }

  checkSupplierCode(SUP_code): Observable<any> {
    const URL = `${this.API_URL}suppliermaster/checksuppliercode/${SUP_code}`;
    return this.http
      .get<any>(URL, httpOptions)
      .pipe(catchError(this.handleError<any>("checkSupplierCode")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
