import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MasterServiceService } from "../../_services/master-service.service";
import { Validations } from "../../_helpers/validations";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../_services/alert.service";
import { empCodeCheckValidator } from "../../_helpers/unique-records.directive";

@Component({
  selector: "app-employee-master",
  templateUrl: "./employee-master.component.html"
})
export class EmployeeMasterComponent implements OnInit {
  empMaster: FormGroup;
  userTypes = [];
  imgURL = "../../../assets/img/images.png";
  selectedImage: File;
  uploadedImg: any;

  constructor(
    private fb: FormBuilder,
    private masterservice: MasterServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.empMaster = this.fb.group({
      Emp_code: [
        "",
        [Validators.required],
        empCodeCheckValidator(this.masterservice)
      ],
      Emp_name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_address: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_city: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_state: ["", [Validators.required, Validations.alphaNumericPattern]],
      Emp_adhar: [
        "",
        [
          Validators.required,
          Validations.floatnumberPattern,
          Validators.minLength(12),
          Validators.maxLength(12)
        ]
      ],
      Emp_pan: [
        "",
        [
          Validators.required,
          Validations.alphaNumericPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      User_name: ["", [Validators.required, Validations.alphaNumericPattern]],
      Password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validations.passwordValidator
        ]
      ],
      Email_id: ["", [Validators.required, Validators.email]],
      Mobile_no: [
        "",
        [
          Validators.required,
          Validations.floatnumberPattern,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      Type_of_user: ["", Validators.required]
    });

    this.fetchCommonMaster(3);
  }

  get Emp_code() {
    return this.empMaster.get("Emp_code");
  }

  get Emp_name() {
    return this.empMaster.get("Emp_name");
  }

  get Emp_address() {
    return this.empMaster.get("Emp_address");
  }

  get Emp_city() {
    return this.empMaster.get("Emp_city");
  }

  get Emp_state() {
    return this.empMaster.get("Emp_state");
  }

  get Emp_adhar() {
    return this.empMaster.get("Emp_adhar");
  }

  get Emp_pan() {
    return this.empMaster.get("Emp_pan");
  }

  get User_name() {
    return this.empMaster.get("User_name");
  }

  get Password() {
    return this.empMaster.get("Password");
  }

  get Email_id() {
    return this.empMaster.get("Email_id");
  }

  get Mobile_no() {
    return this.empMaster.get("Mobile_no");
  }

  get Type_of_user() {
    return this.empMaster.get("Type_of_user");
  }

  onSubmit() {
    const formData = this.empMaster.value;

    this.masterservice.addEmployeeMaster(formData).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record added successfuly");
        this.empMaster.reset();
        this.router.navigate(["/emp-master"]);
      } else {
        this.alertService.openSnackBar(
          "Error adding record. Please try again."
        );
      }
    });
  }

  fetchCommonMaster(CM_Id) {
    this.masterservice.fetchCommonChildFromCM(CM_Id).subscribe(list => {
      this.userTypes = list;
      this.userTypes = this.userTypes.filter(function(e) {
        return e.CMC_Id > 10;
      });
    });
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
    input.append(
      "Emp_profile_img",
      this.selectedImage,
      this.selectedImage.name
    );
    this.masterservice.employeePhotoUpload(input).subscribe(data => {
      console.log(data);
      if (data.status == 1) {
        this.uploadedImg = data.filename;
        this.alertService.openSnackBar("Image Uploaded successfuly");
      } else {
        this.alertService.openSnackBar(data.message);
      }
    });
  }
}
