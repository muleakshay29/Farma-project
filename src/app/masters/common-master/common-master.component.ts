import { Component, OnInit, ViewChild } from "@angular/core";
import { MasterServiceService } from "../../_services/master-service.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-common-master",
  templateUrl: "./common-master.component.html"
})
export class CommonMasterComponent implements OnInit {
  commonMasterList: any[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["Action", "CM_Name"];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private masterservice: MasterServiceService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchCommonMaster();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchCommonMaster() {
    this.masterservice.fetchCommonMaster().subscribe(commonMasterList => {
      this.dataSource = new MatTableDataSource(commonMasterList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCommonMaster(_id) {
    this.masterservice.deleteCommonMaster(_id).subscribe(data => {
      if (data != null) {
        this.fetchCommonMaster();
        this.alertService.openSnackBar("Record deleted successfuly");
      } else {
        this.alertService.openSnackBar("Error deleting record");
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
      }
    });
  }
}
