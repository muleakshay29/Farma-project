import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProductMasterService } from "../../_services/product-master.service";
import { MasterServiceService } from "../../_services/master-service.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/typeahead-match.class";

@Component({
  selector: "app-customer-master",
  templateUrl: "./customer-master.component.html"
})
export class CustomerMasterComponent implements OnInit {
  customerMaster: FormGroup;

  Customer_name: string = "";
  City: string = "";
  Area: string = "";
  Address: string = "";
  Email: string = "";
  Phone_no: number = 0;

  constructor(
    private fb: FormBuilder,
    private pservice: ProductMasterService,
    private masterservice: MasterServiceService
  ) {}

  ngOnInit() {
    this.customerMaster = this.fb.group({
      Cust_name: ["", Validators.required],
      Cust_code: [""],
      Opening_balance: ["", Validators.required],
      Opening_balance_type: ["", Validators.required]
    });
  }

  get Cust_name() {
    return this.customerMaster.get("Cust_name");
  }

  get Cust_code() {
    return this.customerMaster.get("Cust_code");
  }

  get Opening_balance() {
    return this.customerMaster.get("Opening_balance");
  }

  get Opening_balance_type() {
    return this.customerMaster.get("Opening_balance_type");
  }

  onSubmit() {}
}
