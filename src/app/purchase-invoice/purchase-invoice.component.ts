import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material';
import { MasterServiceService } from "../_services/master-service.service";
import { AlertService } from "../_services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Validations } from "../_helpers/validations";

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html'
})
export class PurchaseInvoiceComponent implements OnInit {

  invoiceMaster: FormGroup;
  productsList = [];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  
  constructor(
    private fb:FormBuilder,
    private masterservice: MasterServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.invoiceMaster = this.fb.group({
      InvoiceDate: this.serializedDate,
      InvoiceNo:['', [Validators.required, Validations.numberPattern]],
      SubTotal:['', [Validators.required, Validations.floatnumberPattern]],
      CGST:[""],
      SGST:[""],
      IGST:[""],
      Total:["", Validators.required],
      ProdList:this.fb.array([this.fb.group({
        itemName:'',
        itemQty:'',
        itemPrice:''
      })]),
    });
  }


  get itemName()
  {
    return this.invoiceMaster.get("itemName");
  }
  get itemQty()
  {
    return this.invoiceMaster.get("itemQty");
  }
  get itemPrice()
  {
    return this.invoiceMaster.get("itemPrice");
  }

  get InvoiceDate()
  {
    return this.invoiceMaster.get("InvoiceDate");
  }

  get InvoiceNo()
  {
    return this.invoiceMaster.get("InvoiceNo");
  }
  get SubTotal()
  {
    return this.invoiceMaster.get("SubTotal");
  }
  get CGST()
  {
    return this.invoiceMaster.get("CGST");
  }
  get SGST()
  {
    return this.invoiceMaster.get("SGST");
  }
  get IGST()
  {
    return this.invoiceMaster.get("IGST");
  }

  get Total()
  {
    return this.invoiceMaster.get("Total");
  }

  onSubmit() {

      const formData = this.invoiceMaster.value;
      console.log(formData);
      this.masterservice.CreateInvoice(formData).subscribe(e => {
        if (e > 0) {
          this.alertService.openSnackBar("Invoice genrated successfuly");
          this.invoiceMaster.reset();
          this.router.navigate(["/invoice"]);
        } else {
          this.alertService.openSnackBar("Error in genrating invoice");
        }
      });
    
  }

  addProduct(){
    let items = this.invoiceMaster.controls.ProdList as FormArray;

    items.push(this.fb.group({
      itemName:'',
      itemQty:'',
      itemPrice:'',
    }));
  }

  getsubtotal(){
    let all_item = this.invoiceMaster.controls.ProdList.value;

    if(all_item.length > 0){
     // console.log(all_item[0].itemPrice);
      let count_subTotal = Number(Object.values(all_item).reduce((t, {itemPrice} ) => Number(t) + Number(itemPrice),0));
      this.invoiceMaster.controls.SubTotal.setValue(count_subTotal);
    }
  }

  gettotal(){
    let IGST = this.invoiceMaster.controls.IGST.value;
    let SGST = this.invoiceMaster.controls.SGST.value;
    let CGST = this.invoiceMaster.controls.CGST.value;
    let SubTotal = this.invoiceMaster.controls.SubTotal.value;

    let orderTotal = Number(IGST) + Number(SGST) + Number(CGST) + Number(SubTotal);
    this.invoiceMaster.controls.Total.setValue(orderTotal);
  }

  onCancel() {
    this.router.navigate(["/invoice"]);
  }

}
