import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { CustomValidationRules, ValidationMessages, ValidationExpression } from './constants';
export function ValidateField(validationObject: CustomValidationRules, param: FormGroup): ValidatorFn {

    let validationMessages = new ValidationMessages();
    let validationExpression = new ValidationExpression();

    return (control: AbstractControl): { [key: string]: any } => {

        const controlValues = control.value;
        var count = new String(controlValues).length;
        if (control.dirty && validationObject.ValidationType != '') {
            switch (validationObject.ValidationType) {
                case 'FullName':

                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.FullName_Required }
                    }

                    else if (!(ValidationExpression.Expressions.FullName_Valid.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.FullName_Valid }
                    }

                    else if (count < 4) {
                        return { 'message': ValidationMessages.Messages.FullName_Minimum }
                    }
                    else if (count > 30) {
                        return { 'message': ValidationMessages.Messages.FullName_Maximum }
                    }
                    break;

                case 'PhoneNumber':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.PhoneNumber_Required }
                    }
                    else if (!(ValidationExpression.Expressions.PhoneNumber_Valid.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.PhoneNumber_Valid }
                    }
                    break;
                case 'TravelDate':
                    var givenDate = new Date(controlValues);
                    var currentDate = new Date();
                    if (givenDate <= currentDate) {
                        return { 'message': ValidationMessages.Messages.TravelDate_Valid }
                    }
                    break;
                case 'Cab_FromPlace':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.Cab_FromPlace_Required }
                    }
                    else if (!(ValidationExpression.Expressions.Cab_FromPlace_Valid.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.Cab_FromPlace_Valid }
                    }
                    break;
                case 'Cab_ToPlace':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.Cab_ToPlace_Required }
                    }
                    else if (!(ValidationExpression.Expressions.Cab_ToPlace_Valid.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.Cab_ToPlace_Valid }
                    }
                    break;
                case 'Trip_NumberOfDays':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.Trip_NumberOfDays_Required }
                    }
                    else if (!(ValidationExpression.Expressions.Trip_NumberOfDays_Valid.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.Trip_NumberOfDays_Valid }
                    }
                    break;
                case 'Trip_Places':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.Trip_Places_Required }
                    }
                    else if (!(ValidationExpression.Expressions.Trip_Places.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.Trip_Places_Valid }
                    }
                    break;
                case 'Vehicle':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.Vehicle_Required }
                    }
                    break;
                case 'EmailId':
                    if (controlValues == "") {
                        return { 'message': ValidationMessages.Messages.EmailId_Required }

                    }
                    else if (!(ValidationExpression.Expressions.EmailId_Valid.test(controlValues))) {
                        return { 'message': ValidationMessages.Messages.EmailId_Valid }
                    }



            }
        }
        else
            return null;
    }

}

export class CommonFunction {
    static returnTRN = function () {
        let returnTRNValue = '';
        [].slice.apply(arguments).forEach(function (value) {
            value = value.toString();
            returnTRNValue += value.length == 1 ? '0' + value : value;
        });
        return returnTRNValue;
    }
    static GenerateTravelReferenceNumber = function (requestType: string) {
        var dateRef = new Date();
        var TRN = '';
        TRN = this.returnTRN(dateRef.getFullYear(), dateRef.getMonth(), dateRef.getDate(), dateRef.getHours(), dateRef.getMinutes(), dateRef.getSeconds(), dateRef.getMilliseconds());
        TRN = 'R' + requestType.charAt(0) + TRN;
        return TRN;
    }
    static getDomainName = function (hostName) {
        return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    }

}