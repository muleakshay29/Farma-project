import "../../polyfills";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule
} from "@angular/material";

import { ErrorMessageComponent } from "../_helpers/error-message/error-message.component";
import {
  AlertModule,
  PopoverModule,
  PaginationModule,
  ModalModule,
  TypeaheadModule
} from "ngx-bootstrap";

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    PopoverModule,
    PaginationModule,
    ModalModule,
    TypeaheadModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ErrorMessageComponent
  ]
})
export class SharedModule {}
