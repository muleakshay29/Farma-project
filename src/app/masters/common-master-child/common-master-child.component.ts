import { Component, OnInit, ViewChild } from "@angular/core";
import { MasterServiceService } from "../../_services/master-service.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-common-master-child",
  templateUrl: "./common-master-child.component.html"
})
export class CommonMasterChildComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["Action", "CM_Name", "CMC_Name"];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private masterservice: MasterServiceService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchCommonMasterChild();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchCommonMasterChild() {
    this.masterservice
      .fetchCommonMasterChild()
      .subscribe(commonMasterCHildList => {
        this.dataSource = new MatTableDataSource(commonMasterCHildList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteCommonMasterChild(CMC_Id) {
    this.masterservice.deleteCommonMasterChild(CMC_Id).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchCommonMasterChild();
      } else {
        this.alertService.openSnackBar("Error deleting record");
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
      }
    });
  }
}
