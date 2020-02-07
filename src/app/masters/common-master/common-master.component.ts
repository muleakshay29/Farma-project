import { Component, OnInit, ViewChild } from "@angular/core";
import { MasterServiceService } from "../../_services/master-service.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-common-master",
  templateUrl: "./common-master.component.html"
})
export class CommonMasterComponent implements OnInit {
  bsModalRef: BsModalRef;
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
    this.fetchCommonMaster();
    this.getItemCount();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchCommonMaster(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchCommonMaster(event.page - 1, this.itemsPerPage);
  }

  fetchCommonMaster(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.showSpinner = true;
    this.masterservice
      .fetchCommonMaster(pageIndex, pageSize)
      .subscribe(commonMasterList => {
        this.returnedArray = commonMasterList.slice(0, this.itemsPerPage);
        this.showSpinner = false;
      });
  }

  getItemCount() {
    this.masterservice.getItemCount("cm-item-count").subscribe(data => {
      this.dataLength = data.count;
    });
  }

  findCommonMaster(event) {
    this.showSpinner = true;
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchCommonMaster();
      this.getItemCount();
      this.showSpinner = false;
    }

    if (searchTxt.length >= 3) {
      this.masterservice
        .findCommonMaster({ CM_Name: searchTxt })
        .subscribe(result => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.showSpinner = false;
        });
    }
  }

  deleteCommonMaster(_id) {
    this.masterservice.deleteCommonMaster(_id).subscribe(data => {
      if (data != null) {
        this.fetchCommonMaster();
        this.alertService.openSnackBar("Record deleted successfuly");
      } else {
        this.alertService.openSnackBar("Error deleting record");
        this.showSpinner = false;
      }
    });
  }

  openModalWithComponent(CM_Name: string, _id: string) {
    const initialState = {
      message: "Are you sure to delete " + CM_Name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteCommonMaster(_id);
        this.showSpinner = true;
      }
    });
  }
}
