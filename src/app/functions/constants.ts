
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class ValidationExpression {
    public static Expressions = {
        //FullName
        'FullName_Valid': /^[a-zA-Z ]+$/,
        'FullName_Minimum': /^([A-Za-z]{0,4})/,
        //PhoneNumber
        'PhoneNumber_Valid': /^\d{10}$/,
        // 'PhoneNumber_Valid':/(\d{3})\-?(\d{3})\-?(\d{4}),'$1-$2-$3'/,
        //From
        'Cab_FromPlace_Valid': /^[a-zA-Z]+$/,
        //To
        'Cab_ToPlace_Valid': /^[a-zA-Z]+$/,
        //Number of Days
        'Trip_NumberOfDays_Valid': /\d{1,2}/,
        'Trip_Places': /[a-zA-Z0-9 ,]+$/,

        'EmailId_Valid': /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/
    }
}
export class ValidationMessages {
    public static Messages = {
        //FullName
        'FullName_Valid': 'Please enter a Valid Name',
        'FullName_Required': 'Name is required',
        'FullName_Minimum': 'Minimum of 4 characters are required',
        'FullName_Maximum': 'Maximum of 30 characters are allowed',

        //PhoneNumber
        'PhoneNumber_Required': 'PhoneNumber is required',
        'PhoneNumber_Valid': 'Please enter 10 digits PhoneNumber',

        //TravelDate
        'TravelDate_Required': 'Travel date is required',
        'TravelDate_Valid': 'Please enter valid future date',

        //From
        'Cab_FromPlace_Required': 'From place is required',
        'Cab_FromPlace_Valid': 'Please enter a Valid Place',

        //To
        'Cab_ToPlace_Required': 'To place is required',
        'Cab_ToPlace_Valid': 'Please enter a Valid Destination',

        //Number of days
        'Trip_NumberOfDays_Required': 'Number of days is required',
        'Trip_NumberOfDays_Valid': 'Please enter valid days',

        //Number of days
        'Trip_Places_Required': 'Place is required',
        'Trip_Places_Valid': 'Please enter valid place',

        //Vehicle
        'Vehicle_Required': 'Please select a Vehicle',

        // EmailId
        'EmailId_Required': 'Enter a valid Email Address',
        'EmailId_Valid': 'Incorrect E-mail format'
    }
}
export class CustomValidationRules {
    public ValidationType: string;
    constructor(Type: string = '') {
        this.ValidationType = Type;
    }
}

export class ApplicationConstants {
    public static RequestType = {
        'CAB': 'CAB',
        'TRIP': 'TRIP',
        'CONTACT': 'CONTACT',
        'MAIL':'MAIL',
        'CALL':'CALL',
        'PAGE':'PAGE'
    }
    public static CustomerAction = {
        'SUBMIT': 'SUBMIT',
        'CLEAR': 'CLEAR'
    }
    public static ErrorPath = '/Error';
}

export class ReplacingStringValues {
    public static CURRENTYEAR = '[@CURRENTYEAR@]';
    public static FULLNAME = '[@FULLNAME@]';
    public static TRAVELREFERENVENUMBER = '[@TRAVELREFERENVENUMBER@]';
}
