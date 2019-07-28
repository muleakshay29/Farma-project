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
