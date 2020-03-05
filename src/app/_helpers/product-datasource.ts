import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { ProductMasterService } from "../_services/product-master.service";
import { catchError, finalize } from "rxjs/operators";

export class ProductDatasource extends DataSource<any> {
  private productSubject = new BehaviorSubject<any[]>([]);

  // to show the total number of records
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private pservice: ProductMasterService) {
    super();
  }

  loadProducts(pageIndex: number, pageSize: number) {
    // use pipe operator to chain functions with Observable type
    this.pservice
      .fetchProduct2(pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => {})
      )
      // subscribe method to receive Observable type data when it is ready
      .subscribe((result: any) => {
        console.log(result);
        console.log(result.length);
        this.productSubject.next(result);
        this.countSubject.next(8000);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    console.log("Connecting data source");
    return this.productSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productSubject.complete();
    this.countSubject.complete();
  }
}
