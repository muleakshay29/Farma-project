import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-sales-details",
  templateUrl: "./sales-details.component.html"
})
export class SalesDetailsComponent implements OnInit {
  local_data: any;
  constructor(
    public dialogRef: MatDialogRef<SalesDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.local_data = { ...data };
  }

  ngOnInit(): void {}
}
