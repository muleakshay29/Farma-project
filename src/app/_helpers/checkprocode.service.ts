import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms'
import { ProductMasterService } from "../_services/product-master.service";

@Injectable({
  providedIn: 'root'
})
export class CheckprocodeService {

  constructor(private pservice: ProductMasterService) { }

  checkProcode(control: FormControl): any {
    console.log(control.value)
    if(control.value !== null || control.value !== "") {
    return new Promise(resolve => {
      this.pservice.checkProcode(control.value).subscribe(res => {
        if(res) {
          resolve(null)
        }
      }, (e) => {
        resolve({'procodeInUse': true})
      })
    })
  } else {
    return null;
  }
  }
}
