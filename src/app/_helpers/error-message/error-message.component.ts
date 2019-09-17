import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Validations } from "../validations";

@Component({
  selector: "app-error-message",
  template:
    '<div *ngIf="errorMessage !== null" class="invalid-feedback d-block"><em><small>* {{errorMessage}}</small></em></div>'
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.invalid &&
<<<<<<< HEAD
        this.control.dirty
=======
        this.control.dirty //|| this.control.touched
>>>>>>> 4ab684e9c086935e5b949260d237e13c26f619de
      ) {
        return Validations.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
