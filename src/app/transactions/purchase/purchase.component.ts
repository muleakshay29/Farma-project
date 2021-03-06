import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../../_services/transaction.service";
import { MatDialog } from "@angular/material/dialog";
import { BsModalRef } from "ngx-bootstrap/modal";
import { DialogBoxComponent } from "../../_helpers/dialog-box/dialog-box.component";
import { MasterServiceService } from "../../_services/master-service.service";
import { PageChangedEvent } from "ngx-bootstrap";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html"
})
export class PurchaseComponent implements OnInit {
  bsModalRef: BsModalRef;
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  showSpinner: boolean = false;

  constructor(
    private transervice: TransactionService,
    public dialog: MatDialog,
    private masterservice: MasterServiceService
  ) {}

  ngOnInit() {
    this.fetchSalesOrder();
  }

  pageChanged(event: PageChangedEvent): void {
    this.fetchSalesOrder(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchSalesOrder(event.page - 1, this.itemsPerPage);
  }

  fetchSalesOrder(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.transervice
      .fetchPurchaseOrder(pageIndex, pageSize)
      .subscribe(orders => {
        this.returnedArray = orders.slice(0, this.itemsPerPage);
        this.showSpinner = false;
      });
  }

  getItemCount() {
    this.masterservice.getItemCount("sales-order-count").subscribe(data => {
      this.dataLength = data.count;
    });
  }

  openDialog(id, SupplierID): void {
    const salesPurchaseFlag = 1; //Purchase Order
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { id, SupplierID, salesPurchaseFlag }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
