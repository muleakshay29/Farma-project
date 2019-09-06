import { Directive } from "@angular/core";
import {
  AbstractControl,
  ValidationErrors,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MasterServiceService } from "../_services/master-service.service";
import { ProductMasterService } from "../_services/product-master.service";

export function cmnameCheckValidator(
  masterservice: MasterServiceService
): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return masterservice.checkcmname(c.value).pipe(
      map(data => {
        return data === true ? { alreadyExist: true } : null;
      })
    );
  };
}

export function cmcnameCheckValidator(
  masterservice: MasterServiceService
): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return masterservice.checkcmcname(c.value).pipe(
      map(data => {
        return data === true ? { alreadyExist: true } : null;
      })
    );
  };
}

export function empCodeCheckValidator(
  masterservice: MasterServiceService
): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return masterservice.checkempcode(c.value).pipe(
      map(data => {
        return data === true ? { alreadyExist: true } : null;
      })
    );
  };
}

export function checkProcode(pservice: ProductMasterService): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return pservice.checkProcode(c.value).pipe(
      map(data => {
        return data === true ? { alreadyExist: true } : null;
      })
    );
  };
}

export function checkSupplierCode(
  masterservice: MasterServiceService
): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return masterservice.checkSupplierCode(c.value).pipe(
      map(data => {
        return data === true ? { alreadyExist: true } : null;
      })
    );
  };
}

@Directive({
  selector: "[appUniqueRecords]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueRecordsDirective,
      multi: true
    }
  ]
})
export class UniqueRecordsDirective {
  constructor() {}
}
