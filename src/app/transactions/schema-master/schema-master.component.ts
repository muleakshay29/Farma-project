import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TransactionService } from "../../_services/transaction.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-schema-master",
  templateUrl: "./schema-master.component.html"
})
export class SchemaMasterComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "Action",
    "PRO_Name",
    "Quantity",
    "Free_Quantity"
  ];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private transervice: TransactionService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchScheme();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchScheme() {
    this.transervice.fetchScheme().subscribe(schemeList => {
      this.dataSource = new MatTableDataSource(schemeList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteScheme(_id) {
    this.transervice.deleteScheme(_id).subscribe(data => {
      if (data != null) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchScheme();
      } else {
        this.alertService.openSnackBar("Error deleting record");
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
      }
    });
  }
}
