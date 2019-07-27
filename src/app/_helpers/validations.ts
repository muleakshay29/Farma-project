import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ProductMasterService } from "../_services/product-master.service";

export class Validations {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'null': 'Required field',
            'required': 'Required field',
            'email': 'Invalid email',
            'invalidFormat': 'Only characters are allowed',
            'invallidNumbers': 'Only numbers are allowed',
            'alreadyExist': 'Already exist',
            'invalidBarcode': 'Invalid barcode pattern',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'missmatch': 'It should be same as Password',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length ${validatorValue.requiredLength}`,
            'max': `Maximum length ${validatorValue.requiredLength}`
        };
        return config[validatorName];
    }

    static characterPattern(control) {
        if (control.value === null) {
            return { 'invalidFormat': true };
        } else {
            if (control.value.match(/^[a-zA-Z]{3,100}$/)) {
                return null;
            } else {
                return { 'invalidFormat': true };
            }
        }
    }

    static numberPattern(control) {
        if (control.value === null) {
            return { 'invallidNumbers': true };
        } else {
            if (control.value.match(/^[0-9]*$/)) {
                return null;
            } else {
                return { 'invallidNumbers': true };
            }
        }
    }

    static alphaNumericPattern(control) {
        if (control.value === null) {
            return { 'invalidFormat': true };
        } else {
            if (control.value.match(/^[a-zA-Z0-9&_ ]*$/)) {
                return null;
            } else {
                return { 'invalidFormat': true };
            }
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number

        if (control.value === null) {
            return { 'invalidPassword': true };
        } else {
            if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                return null;
            } else {
                return { 'invalidPassword': true };
            }
        }
    }

    static floatnumberPattern(control) {
        if (control.value === null) {
            return { 'invallidNumbers': true };
        } else {
            if (control.value.match('^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$')) {
                return null;
            } else {
                return { 'invallidNumbers': true };
            }
        }
    }

    static barcodePattern(control) {
        if (control.value === null) {
            return { 'invalidBarcode': true };
        } else {
            if (control.value.match(/^8[0-9]{11}([0-9]{2})?$/)) {
                return null;
            } else {
                return { 'invalidBarcode': true };
            }
        }
    }
}
