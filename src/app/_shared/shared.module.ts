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
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
} from "@angular/material";

import { ErrorMessageComponent } from "../_helpers/error-message/error-message.component";
import { PaginationComponent } from "../_helpers/pagination/pagination.component";
import {
  AlertModule,
  PopoverModule,
  PaginationModule,
  ModalModule,
  TypeaheadModule,
  BsDatepickerModule
} from "ngx-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
  declarations: [ErrorMessageComponent, PaginationComponent],
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
    BsDatepickerModule.forRoot(),
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    NgxDatatableModule
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
    BsDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ErrorMessageComponent,
    PaginationComponent,
    NgxDatatableModule
  ]
})
export class SharedModule {}
