import { Component, OnInit, ElementRef } from '@angular/core';
import { Customer, Vehicle, EnquiryRequest, NotifyRequest, EmailRequest, TextMessageRequest, Status } from '../../models/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateField, CommonFunction } from '../../functions/directives';
import { CustomValidationRules, ValidationMessages, ApplicationConstants, ReplacingStringValues } from '../../functions/constants';
import { APIService } from '../../functions/api/services';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public EnquiryRequest: EnquiryRequest;
    public enquiryForm: FormGroup;
    public IsCabRequest: boolean = true;
    private Submitted: boolean = false;
    private ValidationMessages = ValidationMessages;
    private PageContent: any;
    private HideEnquiryControl: boolean;
    private Response: any;
    private ShowLoader: boolean = false;
    private NotifyRequest: NotifyRequest;
    private EmailRequest: EmailRequest;
    private TextMessageRequest: TextMessageRequest;
    private subscription: Subscription;
    private CommonFunction: CommonFunction;
    private CABS: Array<Vehicle>;
    private Slides: any;
    private FacebookPosts: any;
    private timerId_POST: any;
    private ShowFacebookPosts: boolean;
    private foldEnquiry: boolean = false;
    private element: ElementRef;


    constructor(private formBuilder: FormBuilder, public APIService: APIService, private activatedRoute: ActivatedRoute) {
        this.ResetEnquiryModel();
        this.ShowFacebookPosts = false;
        this.subscription = this.APIService.sericeResponded$.subscribe(
            data => {
                this.AssignValues();
            });
        this.resetTimer_POST();
    }

    ResetEnquiryModel() {
        this.EnquiryRequest = new EnquiryRequest(new Customer('', '', ''), '', '', '', '', '', new Vehicle('', '', '', 0, 0, 0, 0, 0, '', ''));
        return;
    }
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['CABID']) {
                this.EnquiryRequest.Vehicle.ID = params['CABID'];
            }
        });
        this.buildForm();
        if (this.APIService.PageContent.Content !== undefined) {
            this.AssignValues();
        }


    }

    buildForm(): void {
        this.Submitted = false;
        this.ShowLoader = false;
        this.HideEnquiryControl = false;
        this.Response = {};
        this.Response.ResultText = '';
        this.enquiryForm = this.formBuilder.group({
            'FullName': [this.EnquiryRequest.Customer.FullName, [Validators.required, ValidateField(new CustomValidationRules('FullName'), this.enquiryForm)]],
            'PhoneNumber': [this.EnquiryRequest.Customer.PhoneNumber, [Validators.required, ValidateField(new CustomValidationRules('PhoneNumber'), this.enquiryForm)]],
            'TravelDate': [this.EnquiryRequest.TravelDate, [Validators.required, ValidateField(new CustomValidationRules('TravelDate'), this.enquiryForm)]],
            'Cab_FromPlace': [this.EnquiryRequest.Cab_FromPlace, [(this.IsCabRequest) ? Validators.required : Validators.nullValidator, ValidateField(new CustomValidationRules('Cab_FromPlace'), this.enquiryForm)]],
            'Cab_ToPlace': [this.EnquiryRequest.Cab_ToPlace, [(this.IsCabRequest) ? Validators.required : Validators.nullValidator, ValidateField(new CustomValidationRules('Cab_ToPlace'), this.enquiryForm)]],
            'Trip_NumberOfDays': [this.EnquiryRequest.Trip_NumberOfDays, [(!this.IsCabRequest) ? Validators.required : Validators.nullValidator, ValidateField(new CustomValidationRules('Trip_NumberOfDays'), this.enquiryForm)]],
            'Trip_Places': [this.EnquiryRequest.Trip_Places, [(!this.IsCabRequest) ? Validators.required : Validators.nullValidator, ValidateField(new CustomValidationRules('Trip_Places'), this.enquiryForm)]],
            'Vehicle': [this.EnquiryRequest.Vehicle.ID, [Validators.required, ValidateField(new CustomValidationRules('Vehicle'), this.enquiryForm)]]
        });
    }

    ToggleService = function (requestType: string) {
        if (requestType === ApplicationConstants.RequestType.CAB && !this.IsCabRequest) {
            this.IsCabRequest = true;
            this.buildForm();
        }
        else if (requestType === ApplicationConstants.RequestType.TRIP && this.IsCabRequest) {
            this.IsCabRequest = false;
            this.buildForm();
        }

    }

    ReturnValid = function (controlName: string) {
        var returnValue = '';
        if (controlName !== "") {
            if (this.enquiryForm.controls[controlName].errors !== null) {
                if (this.enquiryForm.controls[controlName].errors.message !== undefined) {
                    return this.enquiryForm.controls[controlName].errors.message;
                }
                else if (this.enquiryForm.controls[controlName].errors.required === true && this.Submitted) {
                    return this.ValidationMessages.Messages[controlName + '_Required'];
                }
                else {
                    '';
                }
            }
        }
    }



    SubmitEnquiryRequest = function (action: string) {
        try {
            if (action === ApplicationConstants.CustomerAction.SUBMIT) {
                this.Submitted = true;
                if (this.enquiryForm.valid) {
                    var TextMessageCount = 0;
                    var EmailCount = 0;
                    this.EnquiryRequest = this.enquiryForm.value;
                    this.ShowLoader = true;
                    this.HideEnquiryControl = true;
                    this.EnquiryRequest.RequestType = (this.IsCabRequest) ? ApplicationConstants.RequestType.CAB : ApplicationConstants.RequestType.TRIP
                    this.EnquiryRequest.Customer = new Customer(this.EnquiryRequest.FullName, this.EnquiryRequest.PhoneNumber);
                    this.NotifyRequest = new NotifyRequest();
                    if (this.IsCabRequest) {
                        this.EnquiryRequest.RequestType = ApplicationConstants.RequestType.CAB;
                    }
                    else {
                        this.EnquiryRequest.RequestType = ApplicationConstants.RequestType.TRIP;
                    }
                    this.EnquiryRequest.TravelReferenceNumber = CommonFunction.GenerateTravelReferenceNumber(this.EnquiryRequest.RequestType)
                    this.EnquiryRequest.Domain = CommonFunction.getDomainName(document.location.hostname);
                    this.EnquiryRequest.ContactUsPhoneNumber = this.APIService.PageContent.Content.PageText.ContactUsPhone;
                    this.EnquiryRequest.IPAddress = this.APIService.IPAddress;
                    this.NotifyRequest.TextMessageStatus = this.APIService.PageContent.Content.ApplicationConfiguration.TextMessageStatus;
                    this.NotifyRequest.TextMessageRequests = Array<TextMessageRequest>();
                    this.NotifyRequest.TextMessageRequests.push(new TextMessageRequest(this.EnquiryRequest.RequestType + TextMessageCount++, this.EnquiryRequest.PhoneNumber, this.APIService.PageContent.Content.NotificationText[this.EnquiryRequest.RequestType + '_CustomerServiceTextMessage'], 'Customer', this.EnquiryRequest.RequestType));
                    this.NotifyRequest.TextMessageRequests.push(new TextMessageRequest(this.EnquiryRequest.RequestType + TextMessageCount++, this.APIService.PageContent.Content.PageText.ContactUsPhone, this.APIService.PageContent.Content.NotificationText[this.EnquiryRequest.RequestType + '_TravelServiceTextMessage'], 'Admin', this.EnquiryRequest.RequestType));
                    this.NotifyRequest.TextMessageCount = TextMessageCount;
                    this.NotifyRequest.EmailStatus = this.APIService.PageContent.Content.ApplicationConfiguration.EmailStatus;
                    this.NotifyRequest.EmailRequests = Array<EmailRequest>();
                    this.NotifyRequest.EmailRequests.push(new EmailRequest(this.EnquiryRequest.RequestType + EmailCount++, this.APIService.PageContent.Content.PageText.ContactUsEmail, this.APIService.PageContent.Content.NotificationText[this.EnquiryRequest.RequestType + '_TravelServiceEmailSubject'], this.APIService.PageContent.Content.NotificationText[this.EnquiryRequest.RequestType + '_TravelServiceEmailTemplate'], '', this.EnquiryRequest.RequestType));
                    this.NotifyRequest.EmailCount = EmailCount;
                    this.EnquiryRequest.NotifyRequest = this.NotifyRequest;
                    this.APIService.NotifyCustomer(this.EnquiryRequest).subscribe(data => {
                        this.Response = data;
                        this.ShowLoader = false;
                        debugger;
                        if (data.Error || data.Exception || data === null) {
                            this.Response.ResultText = this.APIService.PageContent.Content.PageText.RequestServiceFailureText;
                        }
                        else if (data.Response) {
                            this.Response.ResultText = this.APIService.PageContent.Content.PageText.RequestServiceSuccessText.replace(ReplacingStringValues.FULLNAME, this.EnquiryRequest.FullName).replace(ReplacingStringValues.TRAVELREFERENVENUMBER, this.EnquiryRequest.TravelReferenceNumber);
                        }
                        // }, error => {
                        //     console.log(error);
                        //     this.ShowLoader = false;
                        //     this.Response.ResultText = this.APIService.PageContent.Content.PageText.RequestServiceFailureText;
                    });

                }
            }
            else if (action === ApplicationConstants.CustomerAction.CLEAR) {
                this.ResetEnquiryModel();
                this.buildForm();
            }

        }
        catch (Exception) {
            this.buildForm();
        }
        return;
    }
    ResultClick = function () {
        this.ResetEnquiryModel();
        this.buildForm();
    }

    FoldClick = function () {
        this.foldEnquiry = !this.foldEnquiry;
    }

    CabSelectChange = function (event, element) {
        debugger;
        console.log(event, element);

    }
    resetTimer_POST() {
        this.timerId_POST = setInterval(() => {
            this.ChangePost()
        }, 9000);

    }
    ChangePost() {
        var set = true;
        if (this.FacebookPosts !== undefined && this.FacebookPosts.posts !== undefined && this.FacebookPosts.posts.data !== undefined) {
            for (var iCount = 0; iCount < this.FacebookPosts.posts.data.length; iCount++) {
                if (this.FacebookPosts.posts.data[iCount].Active) {
                    this.FacebookPosts.posts.data[iCount].Active = false;
                    // this.FacebookPosts.posts.data[1].Active = true;
                    this.FacebookPosts.posts.data[(this.FacebookPosts.posts.data.length - 1) === iCount ? 0 : iCount + 1].Active = true;
                    return;
                }
            }
        }

    }
    ngOnDestroy() {
        //prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }

    AssignValues() {
        this.CABS = this.APIService.PageContent.Content.Vehicles;
        this.FacebookPosts = this.APIService.PageContent.FacebookPosts;
        this.Slides = {};
        this.Slides.One_slides = this.APIService.PageContent.Content.One_slides;
        this.Slides.Two_slides = this.APIService.PageContent.Content.Two_slides;
        if (this.FacebookPosts !== undefined && this.FacebookPosts.posts && this.FacebookPosts.posts.data) {
            this.ShowFacebookPosts = true;
            this.FacebookPosts.posts.data.forEach(data => {
                data.Active = false;
            });
            return this.FacebookPosts.posts.data[0].Active = true;
        }
    }



}

