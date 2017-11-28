import { Component, OnInit } from '@angular/core';
import { APIService } from '../../functions/api/services';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationConstants } from '../../functions/constants';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  private AboutUsPageHeader: string;
  private AboutUsText: string;
  private TravelSolganText: string;
  private TourSloganText: string;
  private subscription: Subscription;
  private animatecab: boolean = false;
  private animatetrip: boolean = false;
  constructor(public APIService: APIService) {

    this.subscription = this.APIService.sericeResponded$.subscribe(
      data => {
        this.AssignValues();
      });
  }

  ngOnInit() {
    if (this.APIService.PageContent.Content !== undefined) {
      this.AssignValues();
    }
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  testset() {
    //this.animatecab = true;
  };
  onview = (requestType): void => {
    if (requestType === ApplicationConstants.RequestType.CAB) {
      this.animatecab = true;
    }
    else if (requestType === ApplicationConstants.RequestType.TRIP) {
      this.animatetrip = true;
    }
  }

  oncick(requestType) {
    if (requestType === ApplicationConstants.RequestType.CAB) {
      this.animatecab = !this.animatecab;
      this.animatetrip = false;
      //this.APIService.animatecabdiv = true;

    }
    else if (requestType === ApplicationConstants.RequestType.TRIP) {
      this.animatetrip = !this.animatetrip;
      this.animatecab = false;
    }

  }


  AssignValues() {
    this.AboutUsPageHeader = this.APIService.PageContent.Content.PageText.AboutUsPageHeader;
    this.AboutUsText = this.APIService.PageContent.Content.PageText.AboutUsText;
    this.TravelSolganText = this.APIService.PageContent.Content.PageText.TravelSolganText;
    this.TourSloganText = this.APIService.PageContent.Content.PageText.TourSloganText;
  }

}
