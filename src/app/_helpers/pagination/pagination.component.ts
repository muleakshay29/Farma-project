import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html"
})
export class PaginationComponent implements OnInit {
  @Input() dataLength;
  @Input() itemsPerPage;

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
