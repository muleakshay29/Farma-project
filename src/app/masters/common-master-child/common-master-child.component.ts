import { Component, OnInit, ViewChild } from "@angular/core";
import { MasterServiceService } from "../../_services/master-service.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-common-master-child",
  templateUrl: "./common-master-child.component.html"
})
export class CommonMasterChildComponent implements OnInit {
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
    this.fetchCommonMasterChild();
    this.getItemCount();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchCommonMasterChild(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchCommonMasterChild(event.page - 1, this.itemsPerPage);
  }

  fetchCommonMasterChild(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.showSpinner = true;
    this.masterservice
      .fetchCommonMasterChild(pageIndex, pageSize)
      .subscribe(commonMasterCHildList => {
        this.returnedArray = commonMasterCHildList.slice(0, this.itemsPerPage);
        this.showSpinner = false;
      });
  }

  getItemCount() {
    this.masterservice.getItemCount("cmc-item-count").subscribe(data => {
      this.dataLength = data.count;
    });
  }

  findCommonMasterChild(event) {
    const searchTxt = event.target.value;
    this.showSpinner = true;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchCommonMasterChild();
      this.getItemCount();
      this.showSpinner = false;
    }

    if (searchTxt.length >= 3) {
      this.masterservice
        .findCommonMasterChild({ CMC_Name: searchTxt })
        .subscribe(result => {
          this.returnedArray = result;
          this.dataLength = result.length;
          this.showSpinner = false;
        });
    }
  }

  deleteCommonMasterChild(CMC_Id) {
    this.masterservice.deleteCommonMasterChild(CMC_Id).subscribe(data => {
      if (data != null) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchCommonMasterChild();
      } else {
        this.alertService.openSnackBar("Error deleting record");
        this.showSpinner = false;
      }
    });
  }

  openModalWithComponent(CMC_Name: string, CMC_Id: number) {
    const initialState = {
      message: "Are you sure to delete " + CMC_Name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteCommonMasterChild(CMC_Id);
        this.showSpinner = true;
      }
    });
  }
}
