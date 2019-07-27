import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProductMasterService } from "../../_services/product-master.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";
import { AlertService } from "../../_services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html"
})
export class SupplierComponent implements OnInit {
  supplierMaster: FormGroup;
  supplierList: [];

  Supplier_name: string = "";
  Address: string = "";
  Phone1: number = 0;
  Phone2: number = 0;
  Email_id: string = "";
  Opening_bal_type: number = 0;

  constructor(
    private fb: FormBuilder,
    private pservice: ProductMasterService,
    private masterservice: MasterServiceService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.supplierMaster = this.fb.group({
      Supplier: ["", Validators.required],
      Supplier_code: [""]
    });
  }

  get Supplier() {
    return this.supplierMaster.get("Supplier");
  }

  get Supplier_code() {
    return this.supplierMaster.get("Supplier_code");
  }

  onSubmit() {
    const formData = this.supplierMaster.value;
    console.log(formData);
  }
}
