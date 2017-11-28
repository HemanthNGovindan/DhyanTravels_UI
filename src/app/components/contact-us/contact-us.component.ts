import { Component, OnInit } from '@angular/core';
import { Customer, Vehicle, ContactUsRequest, NotifyRequest, EmailRequest, TextMessageRequest, Status } from '../../models/models';
import { APIService } from '../../functions/api/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateField, CommonFunction } from '../../functions/directives';
import { CustomValidationRules, ValidationMessages, ApplicationConstants, ReplacingStringValues } from '../../functions/constants';


@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
    public contactUsRequestOb: ContactUsRequest;
    public contactUsForm: FormGroup;
    private HideContactUsForm: boolean;
    public clientInfoTableClass: string[];
    private validationMessages = ValidationMessages;
    private ShowLoader = false;
    private Response: any;
    private Submitted: boolean = false;
    constructor(private fb: FormBuilder, public APIService: APIService) {
        this.ResetContactModel();
        this.clientInfoTableClass = ["clientInfoTable"]
    }
    ngOnInit() {
        this.buildForm();
    }

    ResetContactModel() {
        this.contactUsRequestOb = new ContactUsRequest(new Customer('', '', ''));
        return;
    }
    buildForm(): void {
        this.Submitted = false;
        this.HideContactUsForm = false;
        this.Response = {};
        this.Response.ResultText = '';
        this.contactUsForm = this.fb.group({
            'FullName': [this.contactUsRequestOb.Customer.FullName, [Validators.required, ValidateField(new CustomValidationRules('FullName'), this.contactUsForm)]],
            'PhoneNumber': [this.contactUsRequestOb.Customer.PhoneNumber, [Validators.required, ValidateField(new CustomValidationRules('PhoneNumber'), this.contactUsForm)]],
            'EmailId': [this.contactUsRequestOb.Customer.EmailId, [Validators.required, ValidateField(new CustomValidationRules('EmailId'), this.contactUsForm)]]
        });
    }

    public ContactUsText = "Contact Us";
    NavigateTo(request) {
        if (request === ApplicationConstants.RequestType.MAIL) {

        }
        else if (request === ApplicationConstants.RequestType.PAGE) {
            window.open(this.APIService.PageContent.Content.PageText.ContactUsFacebookPageLink, "_blank");
        }
    }

    ReturnValid = function (controlName: string) {
        var returnValue = '';
        if (controlName !== "") {
            if (this.contactUsForm.controls[controlName].errors !== null) {
                if (this.contactUsForm.controls[controlName].errors.message !== undefined) {
                    return this.contactUsForm.controls[controlName].errors.message;
                }
                else if (this.contactUsForm.controls[controlName].errors.required === true && this.Submitted) {
                    return this.validationMessages.Messages[controlName + '_Required'];
                }
                else {
                    '';
                }
            }
        }
    }

    SubmitContactRequest = function (action: string) {
        if (action === ApplicationConstants.CustomerAction.SUBMIT) {
            this.Submitted = true;
            if (this.contactUsForm.valid) {
                var TextMessageCount = 0;
                var EmailCount = 0;
                this.ShowLoader = true;
                this.HideContactUsForm = true;
                this.contactUsRequestOb = this.contactUsForm.value;
                this.contactUsRequestOb.RequestType = ApplicationConstants.RequestType.CONTACT;
                this.NotifyRequest = new NotifyRequest();
                this.contactUsRequestOb.TravelReferenceNumber = CommonFunction.GenerateTravelReferenceNumber(this.contactUsRequestOb.RequestType)
                this.contactUsRequestOb.Domain = CommonFunction.getDomainName(document.location.hostname);
                this.contactUsRequestOb.ContactUsPhoneNumber = this.APIService.PageContent.Content.PageText.ContactUsPhone;
                this.contactUsRequestOb.IPAddress = this.APIService.IPAddress;
                this.NotifyRequest.TextMessageStatus = this.APIService.PageContent.Content.ApplicationConfiguration.TextMessageStatus;
                this.NotifyRequest.TextMessageRequests = Array<TextMessageRequest>();
                //customer
                this.NotifyRequest.TextMessageRequests.push(new TextMessageRequest(this.contactUsRequestOb.RequestType + TextMessageCount++, this.contactUsRequestOb.PhoneNumber, this.APIService.PageContent.Content.NotificationText[this.contactUsRequestOb.RequestType + '_CustomerServiceTextMessage'], 'Customer', this.contactUsRequestOb.RequestType));
                //travel service
                this.NotifyRequest.TextMessageRequests.push(new TextMessageRequest(this.contactUsRequestOb.RequestType + TextMessageCount++, this.APIService.PageContent.Content.PageText.ContactUsPhone, this.APIService.PageContent.Content.NotificationText[this.contactUsRequestOb.RequestType + '_TravelServiceTextMessage'], 'Admin', this.contactUsRequestOb.RequestType));
                this.NotifyRequest.TextMessageCount = TextMessageCount;
                this.NotifyRequest.EmailStatus = this.APIService.PageContent.Content.ApplicationConfiguration.EmailStatus;
                this.NotifyRequest.EmailRequests = Array<EmailRequest>();
                //customer
                this.NotifyRequest.EmailRequests.push(new EmailRequest(this.contactUsRequestOb.RequestType + EmailCount++, this.contactUsRequestOb.EmailId, this.APIService.PageContent.Content.NotificationText[this.contactUsRequestOb.RequestType + '_CustomerServiceEmailSubject'], this.APIService.PageContent.Content.NotificationText[this.contactUsRequestOb.RequestType + '_CustomerServiceEmailTemplate'], '', this.contactUsRequestOb.RequestType));
                //travel service
                this.NotifyRequest.EmailRequests.push(new EmailRequest(this.contactUsRequestOb.RequestType + EmailCount++, this.APIService.PageContent.Content.PageText.ContactUsEmail, this.APIService.PageContent.Content.NotificationText[this.contactUsRequestOb.RequestType + '_TravelServiceEmailSubject'], this.APIService.PageContent.Content.NotificationText[this.contactUsRequestOb.RequestType + '_TravelServiceEmailTemplate'], '', this.contactUsRequestOb.RequestType));
                this.NotifyRequest.EmailCount = EmailCount;
                this.contactUsRequestOb.NotifyRequest = this.NotifyRequest;

                this.APIService.NotifyCustomer(this.contactUsRequestOb).subscribe(data => {
                    this.Response = data;
                    this.ShowLoader = false;
                    if (data.Error || data.Exception || data === null) {
                        this.Response.ResultText = this.APIService.PageContent.Content.PageText.ConatctServiceFailureText;
                    }
                    else if (data.Response) {
                        this.Response.ResultText = this.APIService.PageContent.Content.PageText.ConatctServiceSuccessText.replace(ReplacingStringValues.FULLNAME, this.contactUsRequestOb.FullName).replace(ReplacingStringValues.TRAVELREFERENVENUMBER, this.contactUsRequestOb.TravelReferenceNumber);
                    }
                }, error => {
                    console.log(error);
                    this.ShowLoader = false;
                    this.Response.ResultText = this.APIService.PageContent.Content.PageText.ConatctServiceFailureText;
                });

            }
        }
        else if (action === ApplicationConstants.CustomerAction.CLEAR) {
            this.buildForm();
        }
        return;
    }

    ResultClick = function () {
        this.ResetContactModel();
        this.buildForm();
    }

}
