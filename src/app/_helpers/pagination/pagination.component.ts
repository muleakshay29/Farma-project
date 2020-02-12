import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "appPagination",
  templateUrl: "./pagination.component.html"
})
export class PaginationComponent implements OnInit {
  @Input("dataLength") dataLength: number;
  @Input("itemsPerPage") itemsPerPage: number;

  @Output() pageChanged = new EventEmitter();
  @Output() setItemPerPage = new EventEmitter();

  PageChanged(event) {
    this.pageChanged.emit(event);
  }

  SetItemPerPage(event) {
    this.setItemPerPage.emit(event);
  }

  constructor() {}

  ngOnInit() {}
}
