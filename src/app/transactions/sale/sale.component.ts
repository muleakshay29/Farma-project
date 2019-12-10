import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { TransactionService } from "../../_services/transaction.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-sale",
  templateUrl: "./sale.component.html"
})
export class SaleComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "Action",
    "InvoiceDate",
    "Scheme",
    "Product_Name",
    "Product_Quantity",
    "Product_Free_Quantity"
  ];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private transervice: TransactionService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
