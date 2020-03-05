import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { MasterServiceService } from "../../_services/master-service.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AlertService } from "../../_services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { PageChangedEvent } from "ngx-bootstrap";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html"
})
export class SupplierComponent implements OnInit {
  bsModalRef: BsModalRef;
  supplierList = [];
  addFlag = false;
  updateFlag = false;
  supId: any;
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  showSpinner: boolean = false;

  constructor(
    private masterservice: MasterServiceService,
    private router: Router,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchSuppliers();
    this.getItemCount();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchSuppliers(event.page - 1, this.itemsPerPage);
  }

  fetchSuppliers(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.showSpinner = true;
    this.masterservice.fetchSuppliers(pageIndex, pageSize).subscribe(res => {
      this.returnedArray = res.slice(0, this.itemsPerPage);
      this.showSpinner = false;
    });
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchSuppliers(event.page - 1, this.itemsPerPage);
  }

  getItemCount() {
    this.masterservice.getItemCount("scheme-count").subscribe(data => {
      this.dataLength = data.count;
    });
  }

  findSupplier(event) {
    this.showSpinner = true;
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchSuppliers();
      this.getItemCount();
      this.showSpinner = false;
    }

    if (searchTxt.length >= 3) {
      this.masterservice
        .findSupplier({ SUP_CompanyName: searchTxt })
        .subscribe(result => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.showSpinner = false;
        });
    }
  }

  deleteSupplier(SUP_Id) {
    this.masterservice.deleteSupplier(SUP_Id).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchSuppliers();
      } else {
        this.alertService.openSnackBar("Error deleting record");
        this.showSpinner = false;
      }
    });
  }

  openModalWithComponent(SUP_Name: string, SUP_Id: number) {
    const initialState = {
      message: "Are you sure to delete " + SUP_Name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteSupplier(SUP_Id);
        this.showSpinner = true;
      }
    });
  }

  onCancel() {
    this.router.navigate(["/supplier-master"]);
  }
}
