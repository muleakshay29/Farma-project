import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TransactionService } from "../../_services/transaction.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";
import { PageChangedEvent } from "ngx-bootstrap";
import { MasterServiceService } from "../../_services/master-service.service";

@Component({
  selector: "app-schema-master",
  templateUrl: "./schema-master.component.html"
})
export class SchemaMasterComponent implements OnInit {
  bsModalRef: BsModalRef;
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  showSpinner: boolean = false;

  constructor(
    private transervice: TransactionService,
    private modalService: BsModalService,
    private alertService: AlertService,
    private masterservice: MasterServiceService
  ) {}

  ngOnInit() {
    this.fetchScheme();
    this.getItemCount();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchScheme(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchScheme(event.page - 1, this.itemsPerPage);
  }

  fetchScheme(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.showSpinner = true;
    this.transervice.fetchScheme(pageIndex, pageSize).subscribe(schemeList => {
      this.returnedArray = schemeList.slice(0, this.itemsPerPage);
      this.showSpinner = false;
    });
  }

  getItemCount() {
    this.masterservice.getItemCount("scheme-count").subscribe(data => {
      this.dataLength = data.count;
    });
  }

  findScheme(event) {
    this.showSpinner = true;
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchScheme();
      this.getItemCount();
      this.showSpinner = false;
    }

    if (searchTxt.length >= 3) {
      this.transervice.findScheme({ PRO_Name: searchTxt }).subscribe(result => {
        this.returnedArray = result;
        this.dataLength = result.length;
        this.showSpinner = false;
      });
    }
  }

  deleteScheme(_id) {
    this.transervice.deleteScheme(_id).subscribe(data => {
      if (data != null) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchScheme();
      } else {
        this.alertService.openSnackBar("Error deleting record");
        this.showSpinner = false;
      }
    });
  }

  openModalWithComponent(PRO_Name: string, _id: number) {
    const initialState = {
      message: "Are you sure to delete scheme for product " + PRO_Name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteScheme(_id);
        this.showSpinner = true;
      }
    });
  }
}
