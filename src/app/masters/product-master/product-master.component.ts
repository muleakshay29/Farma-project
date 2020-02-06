import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { ProductMasterService } from "../../_services/product-master.service";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  PageEvent
} from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-product-master",
  templateUrl: "./product-master.component.html"
})
export class ProductMasterComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "Action",
    "PRO_code",
    "PRO_Name",
    "PRO_Manufraturer"
  ];
  bsModalRef: BsModalRef;

  contentArray = new Array();
  returnedArray: any[];
  dataLength: number;

  constructor(
    private pservice: ProductMasterService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchProduct();
    this.getProductCount();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.dataSource.data.slice(startItem, endItem);
    this.fetchProduct(event.page - 1, event.itemsPerPage);
  }

  findProduct(event) {
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchProduct();
      this.getProductCount();
    }

    if (searchTxt.length >= 3) {
      this.pservice.findProduct({ PRO_Name: searchTxt }).subscribe(result => {
        this.returnedArray = result;
        this.dataLength = result.length;
      });
    }
  }

  fetchProduct(pageIndex = 0, pageSize = 10) {
    // this.pservice.fetchProduct().subscribe(productlist => {
    this.pservice.fetchProduct2(pageIndex, pageSize).subscribe(productlist => {
      this.dataSource = new MatTableDataSource(productlist);
      this.contentArray = this.dataSource.data;
      this.returnedArray = this.dataSource.data.slice(0, 10);
    });
  }

  /* findProduct(PRO_Name) {
    const searchData = { PRO_Name };
    this.pservice.findProduct(searchData).subscribe(data => {
      this.contentArray = data;
      this.returnedArray = data.slice(0, 10);
      this.dataLength = data.length;
    });
  } */

  getProductCount() {
    this.pservice.getProductCount().subscribe(data => {
      this.dataLength = data.count;
    });
  }

  deleteProduct(PRO_Id) {
    this.pservice.deleteProduct(PRO_Id).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchProduct();
      } else {
        this.alertService.openSnackBar("Error deleting record");
      }
    });
  }

  openModalWithComponent(PRO_Name: string, PRO_Id: number) {
    const initialState = {
      message: "Are you sure to delete " + PRO_Name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteProduct(PRO_Id);
      }
    });
  }
}
