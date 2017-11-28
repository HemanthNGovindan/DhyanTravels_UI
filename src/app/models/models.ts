class Customer {
    FullName: string;
    PhoneNumber: string;
    EmailId: string;
    constructor(FullName: string = '', PhoneNumber: string = '', EmailId: string = '') {
        this.FullName = FullName;
        this.PhoneNumber = PhoneNumber;
        this.EmailId = EmailId;
    }

}

class Vehicle {
    ID: string;
    Title: string;
    Type: string;
    SeatingCapacity: number;
    CostNAC: number;
    CostAC: number;
    MinDistancePerDay: number;
    DriverAllowance: number;
    ImgURL: string;
    ShortDescription: string;
    Active: boolean;


    constructor(ID: string = '', Type: string = '', Title: string = '', SeatingCapacity: number = 0, CostNAC: number = 0, CostAC: number = 0, MinDistancePerDay: number = 0, DriverAllowance: number = 0, ImgURL: string = '', ShortDescription: string = '', Active: boolean = true) {
        this.ID = ID;
        this.Type = Type;
        this.Title = Title;
        this.SeatingCapacity = SeatingCapacity;
        this.CostNAC = CostNAC;
        this.CostAC = CostAC;
        this.MinDistancePerDay = MinDistancePerDay;
        this.DriverAllowance = DriverAllowance;
        this.ImgURL = ImgURL;
        this.ShortDescription = ShortDescription;
        this.Active = Active;

    }
}

class Status {
    Type: string;
    Code: string;
    Description: string;
}
class EnquiryRequest {
    Customer: Customer;
    Vehicle: Vehicle;
    TravelDate: string;
    Cab_FromPlace: string;
    Cab_ToPlace: string;
    Trip_NumberOfDays: string;
    Trip_Places: string;

    constructor(tempCustomer: Customer, TravelDate: string = '', Cab_ToPlace: string = '', Cab_FromPlace: string = '', Trip_NumberOfDays: string = '', Trip_Places: string = '', tempCab: Vehicle = null) {

        this.Cab_FromPlace = Cab_FromPlace;
        this.Cab_ToPlace = Cab_ToPlace;
        this.TravelDate = TravelDate;
        this.Trip_NumberOfDays = Trip_NumberOfDays;
        this.Trip_Places = Trip_Places;
        if (tempCustomer === null) {
            tempCustomer = new Customer('', '', '');
        }
        this.Customer = tempCustomer;
        if (tempCab === null) {
            tempCab = new Vehicle();
        }
        this.Vehicle = tempCab;
    }
}

class ContactUsRequest {
    Customer: Customer;
    constructor(tempContact: Customer) {
        if (tempContact === null) {
            tempContact = new Customer('', '', '');
        }
        this.Customer = new Customer(tempContact.FullName, tempContact.PhoneNumber, tempContact.EmailId)

    }
}
class EmailRequest {
    EmailId: string;
    EmailToEmailId: string;
    EmailSubject: string;
    EmailTemplate_Name: string;
    EmailTemplate: string;
    EmailTarget: string;
    EmailRequestType: string;
    constructor(EmailId: string = '', toEMailId: string = '', subject: string = '', tempalteName: string = '', target: string = '', requestType: string = '') {
        this.EmailId = EmailId;
        this.EmailToEmailId = toEMailId;
        this.EmailSubject = subject;
        this.EmailTemplate_Name = tempalteName;
        this.EmailTarget = target;
        this.EmailRequestType = requestType;
    }
    EmailRequestStatus: string;
    EmailRequest: string;
}
class TextMessageRequest {
    TMessageId: string;
    TMessagePhoneNumber: string;
    TMessageContent: string;
    TMessageTarget: string;
    TMessageRequestType: string;
    constructor(messageId: string = '', phoneNumber: string = '', content: string = '', target: string = '', requestType: string = '') {
        this.TMessageId = messageId;
        this.TMessagePhoneNumber = phoneNumber;
        this.TMessageContent = content;
        this.TMessageTarget = target;
        this.TMessageRequestType = requestType;
    }
}
class NotifyRequest {
    public EmailRequests: Array<EmailRequest>;
    public TextMessageRequests: Array<TextMessageRequest>;
}
export { Customer, Vehicle, EnquiryRequest, ContactUsRequest, NotifyRequest, EmailRequest, TextMessageRequest, Status };