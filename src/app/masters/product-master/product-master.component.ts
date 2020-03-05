import { Component, OnInit, Input } from "@angular/core";
import { ProductMasterService } from "../../_services/product-master.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-product-master",
  templateUrl: "./product-master.component.html"
})
export class ProductMasterComponent implements OnInit {
  bsModalRef: BsModalRef;
  returnedArray: any[];
  dataLength: number;
  itemsPerPage: number = 10;
  showSpinner: boolean = false;

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
    this.fetchProduct(event.page - 1, this.itemsPerPage);
  }

  setItemPerPage(event) {
    this.itemsPerPage = event.target.value;
    this.fetchProduct(event.page - 1, this.itemsPerPage);
  }

  fetchProduct(pageIndex = 0, pageSize = this.itemsPerPage) {
    this.showSpinner = true;
    this.pservice.fetchProduct2(pageIndex, pageSize).subscribe(productlist => {
      this.returnedArray = productlist.slice(0, this.itemsPerPage);
      this.showSpinner = false;
    });
  }

  getProductCount() {
    this.pservice.getProductCount().subscribe(data => {
      this.dataLength = data.count;
    });
  }

  findProduct(event) {
    this.showSpinner = true;
    const searchTxt = event.target.value;

    if (searchTxt == "" || searchTxt.length == 0) {
      this.fetchProduct();
      this.getProductCount();
      this.showSpinner = false;
    }

    if (searchTxt.length >= 3) {
      this.pservice.findProduct({ PRO_Name: searchTxt }).subscribe(result => {
        this.returnedArray = result;
        this.dataLength = result.length;
        this.showSpinner = false;
      });
    }
  }

  deleteProduct(PRO_Id) {
    this.pservice.deleteProduct(PRO_Id).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchProduct();
      } else {
        this.alertService.openSnackBar("Error deleting record");
        this.showSpinner = false;
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
        this.showSpinner = true;
      }
    });
  }
}
