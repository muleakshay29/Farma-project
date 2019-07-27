import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductMasterService } from "../../_services/product-master.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html'
})
export class ProductMasterComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Action','PRO_code','PRO_Name','PRO_Manufraturer'];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pservice: ProductMasterService,
    private modalService: BsModalService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.fetchProduct();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchProduct() {
    this.pservice.fetchProduct()
      .subscribe((productlist) => {
        this.dataSource = new MatTableDataSource(productlist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteProduct(PRO_Id) {
    this.pservice.deleteProduct(PRO_Id)
      .subscribe( (data) => {
        if(data > 0) {
          this.alertService.openSnackBar('Record deleted successfuly');
          this.fetchProduct();
        } else {
          this.alertService.openSnackBar('Error deleting record');
        }
      })
  }

  openModalWithComponent(PRO_Name: string, PRO_Id: number) {
    const initialState = {
      message: 'Are you sure to delete ' + PRO_Name +'?',
      title: 'Delete Confirmation'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {initialState});
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if(result == true) {
        this.deleteProduct(PRO_Id);
      }
    });
  }
}
