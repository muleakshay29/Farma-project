import { Component, OnInit,ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MasterServiceService } from "../../_services/master-service.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from "../../_services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";


@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html"
})
export class SupplierComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Action','SUP_code','SUP_CompanyName'];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  supplierList = [];
  addFlag = false;
  updateFlag = false;
  supId:any;

  constructor(
    private masterservice: MasterServiceService,
    private router: Router,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
      this.fetchSuppliers();
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  fetchSuppliers(){
    this.masterservice.fetchSuppliers().subscribe( (res) => {
      this.supplierList = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteSupplier(SUP_Id) {
    this.masterservice.deleteSupplier(SUP_Id)
      .subscribe( (data) => {
        if(data > 0) {
          this.alertService.openSnackBar('Record deleted successfuly');
          this.fetchSuppliers();
        } else {
          this.alertService.openSnackBar('Error deleting record');
        }
      })
  }

  openModalWithComponent(SUP_Name: string, SUP_Id: number) {
    const initialState = {
      message: 'Are you sure to delete ' + SUP_Name +'?',
      title: 'Delete Confirmation'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {initialState});
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if(result == true) {
        this.deleteSupplier(SUP_Id);
      }
    });
  }

  onCancel() {
    this.router.navigate(["/supplier-master"]);
  }
}
