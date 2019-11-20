import { Component, OnInit, ViewChild } from "@angular/core";
import { MasterServiceService } from "../../_services/master-service.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../../_helpers/delete-confirmation/delete-confirmation.component";
import { AlertService } from "../../_services/alert.service";

@Component({
  selector: "app-employee-master",
  templateUrl: "./employee-master.component.html"
})
export class EmployeeMasterComponent implements OnInit {
<<<<<<< HEAD
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "Action",
    "Emp_name",
    "Email_id",
    "Mobile_no",
    "Type_of_user"
  ];
  bsModalRef: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
=======
  empMaster: FormGroup;
  userTypes = [];
  imgURL = "../../../assets/img/images.png";
  selectedImage: File;
  uploadedImg: any;
>>>>>>> 3dbcd55f710764e3a00c2ab74c6274989b92b0ef

  constructor(
    private masterservice: MasterServiceService,
    private modalService: BsModalService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchEmployee();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchEmployee() {
    this.masterservice.fetchEmployee().subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteEmployee(_id) {
    this.masterservice.deleteEmployee(_id).subscribe(data => {
      if (data > 0) {
        this.alertService.openSnackBar("Record deleted successfuly");
        this.fetchEmployee();
      } else {
        this.alertService.openSnackBar("Error deleting record");
      }
    });
  }

  openModalWithComponent(Emp_name: string, _id: number) {
    const initialState = {
      message: "Are you sure to delete " + Emp_name + "?",
      title: "Delete Confirmation"
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState
    });
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.deleteEmployee(_id);
      }
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
