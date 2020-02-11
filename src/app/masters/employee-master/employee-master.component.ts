import { Component, OnInit, ViewChild } from "@angular/core";
import { MasterServiceService } from "../../_services/master-service.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";
import { PageChangedEvent } from "ngx-bootstrap";

@Component({
  selector: "app-employee-master",
  templateUrl: "./employee-master.component.html"
})
export class EmployeeMasterComponent implements OnInit {
  bsModalRef: BsModalRef;
  userTypes = [];
  imgURL = "../../../assets/img/images.png";
  selectedImage: File;
  uploadedImg: any;

  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  showSpinner: boolean = false;

  constructor(
    private masterservice: MasterServiceService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchEmployee();
    this.getItemCount();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchEmployee(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchEmployee(event.page - 1, this.itemsPerPage);
  }

  fetchEmployee(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.showSpinner = true;
    this.masterservice.fetchEmployee(pageIndex, pageSize).subscribe(list => {
      this.returnedArray = list.slice(0, this.itemsPerPage);
      this.showSpinner = false;
    });
  }

  getItemCount() {
    this.masterservice.getItemCount("employee-count").subscribe(data => {
      this.dataLength = data.count;
    });
  }

  findEmployee(event) {
    this.showSpinner = true;
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchEmployee();
      this.getItemCount();
      this.showSpinner = false;
    }

    if (searchTxt.length >= 3) {
      this.masterservice
        .findEmployee({ Emp_name: searchTxt })
        .subscribe(result => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.showSpinner = false;
        });
    }
  }

  deleteEmployee(_id) {
    this.masterservice.deleteEmployee(_id).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchEmployee();
      } else {
        this.alertService.openSnackBar("Error deleting record");
        this.showSpinner = false;
      }
    });
  }

  openModalWithComponent(Emp_name: string, _id: number) {
    const initialState = {
      message: "Are you sure to delete " + Emp_name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteEmployee(_id);
        this.showSpinner = true;
      }
    });
  }
}
