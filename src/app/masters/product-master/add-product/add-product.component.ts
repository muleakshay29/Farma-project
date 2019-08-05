import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../../_services/master-service.service";
import { ProductMasterService } from "../../../_services/product-master.service";
import { Validations } from "../../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services/alert.service";
import { checkProcode } from "../../../_helpers/unique-records.directive";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html"
})
export class AddProductComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;

  productMaster: FormGroup;
  typeOfProduct = [];
  addFlag = false;
  updateFlag = false;
  pID: any;
  imgURL = "../../../assets/img/images.png";
  selectedImage: File;
  uploadedImg: any;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private pservice: ProductMasterService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.productMaster = this.fb.group({
      PRO_code: ["", [Validators.required], checkProcode(this.pservice)],
      PRO_Name: ["", [Validators.required, Validations.alphaNumericPattern]],
      PRO_Barcode: ["", [Validators.required, Validations.alphaNumericPattern]],
      PRO_Manufraturer: ["", Validators.required],
      PRO_SGST: ["", [Validators.required, Validations.floatnumberPattern]],
      PRO_CGST: ["", [Validators.required, Validations.floatnumberPattern]],
      PRO_IGST: ["", [Validators.required, Validations.floatnumberPattern]],
      PRO_CESS: [""],
      PRO_HSN: ["", Validators.required],
      PRO_ScheduledUnder: ["", Validators.required],
      PRO_Content: ["", Validators.required],
      PRO_ReorderLevel: [
        "",
        [Validators.required, Validations.floatnumberPattern]
      ],
      PRO_Minimum_stock: [
        "",
        [Validators.required, Validations.floatnumberPattern]
      ],
      PRO_Type: ["", Validators.required]
    });

    this.pID = this.route.snapshot.paramMap.get("id");
    if (this.pID == "" || this.pID == null) {
      this.addFlag = true;
      this.updateFlag = false;
      this.fetchCommonMaster(4);
    } else {
      this.addFlag = false;
      this.updateFlag = true;
      this.fetchCommonMaster(4);
      this.fetchProductDetails();
    }
  }

  get PRO_code() {
    return this.productMaster.get("PRO_code");
  }

  get PRO_Name() {
    return this.productMaster.get("PRO_Name");
  }

  get PRO_Barcode() {
    return this.productMaster.get("PRO_Barcode");
  }

  get PRO_Manufraturer() {
    return this.productMaster.get("PRO_Manufraturer");
  }

  get PRO_SGST() {
    return this.productMaster.get("PRO_SGST");
  }

  get PRO_CGST() {
    return this.productMaster.get("PRO_CGST");
  }

  get PRO_IGST() {
    return this.productMaster.get("PRO_IGST");
  }

  get PRO_CESS() {
    return this.productMaster.get("PRO_CESS");
  }

  get PRO_HSN() {
    return this.productMaster.get("PRO_HSN");
  }

  get PRO_ScheduledUnder() {
    return this.productMaster.get("PRO_ScheduledUnder");
  }

  get PRO_Content() {
    return this.productMaster.get("PRO_Content");
  }

  get PRO_ReorderLevel() {
    return this.productMaster.get("PRO_ReorderLevel");
  }

  get PRO_Minimum_stock() {
    return this.productMaster.get("PRO_Minimum_stock");
  }

  get PRO_Type() {
    return this.productMaster.get("PRO_Type");
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedImage = <File>event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (imgsrc: any) => {
        this.imgURL = imgsrc.target.result;
      };
    }
  }

  onProductPhotoUpload() {
    let input = new FormData();
    input.append("PRO_Image", this.selectedImage, this.selectedImage.name);
    this.pservice.productPhotoUpload(input).subscribe(data => {
      if (data.status == 1) {
        this.uploadedImg = data.filename;
        this.alertService.openSnackBar("Image Uploaded successfuly");
      } else {
        this.alertService.openSnackBar(data.message);
      }
    });
  }

  onSubmit() {
    if (this.pID == "" || this.pID == null) {
      const formData = this.productMaster.value;
      formData.PRO_Image = this.uploadedImg;
      this.pservice.addProduct(formData).subscribe(data => {
        if (data > 0) {
          this.alertService.openSnackBar("Record added successfuly");
          this.productMaster.reset();
          this.imgURL = "../../../assets/img/images.png";
          this.uploadedImg = null;
          this.router.navigate(["/product-master"]);
        } else {
          this.alertService.openSnackBar("Error adding record");
        }
      });
    } else {
      const formData = {
        PRO_Id: this.pID,
        PRO_code: this.PRO_code.value,
        PRO_Name: this.PRO_Name.value,
        PRO_Barcode: this.PRO_Barcode.value,
        PRO_Manufraturer: this.PRO_Manufraturer.value,
        PRO_SGST: this.PRO_SGST.value,
        PRO_CGST: this.PRO_CGST.value,
        PRO_IGST: this.PRO_IGST.value,
        PRO_CESS: this.PRO_CESS.value,
        PRO_HSN: this.PRO_HSN.value,
        PRO_ScheduledUnder: this.PRO_ScheduledUnder.value,
        PRO_Content: this.PRO_Content.value,
        PRO_ReorderLevel: this.PRO_ReorderLevel.value,
        PRO_Minimum_stock: this.PRO_Minimum_stock.value,
        PRO_Type: this.PRO_Type.value,
        PRO_Image: this.uploadedImg
      };

      this.pservice.updateProduct(formData).subscribe(data => {
        if (data > 0) {
          this.alertService.openSnackBar("Record updated successfuly");
          this.router.navigate(["/product-master"]);
        } else {
          this.alertService.openSnackBar("Error updating record");
        }
      });
    }
  }

  fetchCommonMaster(CM_Id) {
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.typeOfProduct = list;
    });
  }

  fetchProductDetails() {
    this.pservice.fetchProductDetails(this.pID).subscribe(details => {
      this.productMaster.setValue({
        PRO_code: details.PRO_code,
        PRO_Name: details.PRO_Name,
        PRO_Barcode: details.PRO_Barcode,
        PRO_Manufraturer: details.PRO_Manufraturer,
        PRO_SGST: details.PRO_SGST,
        PRO_CGST: details.PRO_CGST,
        PRO_IGST: details.PRO_IGST,
        PRO_CESS: details.PRO_CESS,
        PRO_HSN: details.PRO_HSN,
        PRO_ScheduledUnder: details.PRO_ScheduledUnder,
        PRO_Content: details.PRO_Content,
        PRO_ReorderLevel: details.PRO_ReorderLevel,
        PRO_Minimum_stock: details.PRO_Minimum_stock,
        PRO_Type: details.PRO_Type
      });

      if (details.PRO_Image == null) {
        this.imgURL = "../../../assets/img/images.png";
      } else {
        this.imgURL = details.PRO_Image;
      }
    });
  }

  onCancel() {
    this.router.navigate(["/product-master"]);
  }
}
