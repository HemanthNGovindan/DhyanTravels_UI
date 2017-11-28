import { Component, OnInit, Input } from '@angular/core';
import { ApplicationConstants } from '../../../functions/constants';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input()
  private Slides: any;
  public one_slides: Array<any> = [];
  public two_slides: Array<any> = [];
  private timerId_CAB: any;
  private timerId_TRIP: any;
  public cabReqestType = ApplicationConstants.RequestType.CAB;
  public tripReqestType = ApplicationConstants.RequestType.TRIP;

  private showText_CAB: boolean = false;
  private showText_TRIP: boolean = false;


  constructor() {
    // for (var count = 1; count <= 3; count++) {
    //   this.one_slides.push({
    //     HeaderText: 'Cab_' + count,
    //     DescriptionText: 'Decsription about image ' + count,
    //     ImgURL: '../assets/img/car/' + count + '.jpg',
    //     ImageIndex: 'CAB' + count,
    //     Active: (count == 1) ? true : false
    //   });
    //   this.two_slides.push({
    //     HeaderText: 'Tour_' + count,
    //     DescriptionText: 'Decsription about image ' + count,
    //     ImgURL: '../assets/img/tour/' + count + '.jpg',
    //     ImageIndex: 'TOUR' + count,
    //     Active: (count == 1) ? true : false
    //   });
    // }

  }
  ngOnInit() {
    this.resetTimer(this.cabReqestType);
    this.resetTimer(this.tripReqestType);

    if (this.Slides && this.Slides.One_slides && this.Slides.Two_slides) {
      this.one_slides = this.Slides.One_slides;
      this.two_slides = this.Slides.Two_slides;
    }
  }
  selectImage(reqestType: string, selectImage: boolean, selectedImage: any) {
    // this.changeImage(reqestType, selectImage, selectedImage);
    if (reqestType === this.cabReqestType) {
      for (var iCount = 0; iCount < this.one_slides.length; iCount++) {
        if (this.one_slides[iCount].ImageIndex === selectedImage.ImageIndex) {
          this.one_slides[iCount].Active = "true";
        }
        else {
          this.one_slides[iCount].Active = "false";
        }
      }
    }
    else {
      for (var iCount = 0; iCount < this.two_slides.length; iCount++) {
        if (this.two_slides[iCount].ImageIndex === selectedImage.ImageIndex) {
          this.two_slides[iCount].Active = "true";
        }
        else {
          this.two_slides[iCount].Active = "false";
        }
      }
    }
  }

  resetTimer(timerType: string) {
    if (timerType == this.cabReqestType) {
      this.timerId_CAB = setInterval(() => {
        this.changeImage(this.cabReqestType, false, null)
      }, 6000);
    }
    else if (timerType == this.tripReqestType) {
      this.timerId_TRIP = setInterval(() => {
        this.changeImage(this.tripReqestType, false, null)
      }, 4000);
    }
  }
  ngOnDestroy() {
    this.clearTimer(this.cabReqestType);
    this.clearTimer(this.tripReqestType);
  }

  changeImage(reqestType: string, selectImage: boolean, selectedImage: any) {
    if (reqestType === this.cabReqestType) {
      for (var iCount = 0; iCount < this.one_slides.length; iCount++) {
        if (this.one_slides[iCount].Active) {
          this.one_slides[iCount].Active = "false";
          this.one_slides[(this.one_slides.length - 1) === iCount ? 0 : iCount + 1].Active = "true";
          break;
        }
      }
    }
    for (var iCount = 0; iCount < this.two_slides.length; iCount++) {
      if (this.two_slides[iCount].Active) {
        this.two_slides[iCount].Active = "false";
        this.two_slides[(this.two_slides.length - 1) === iCount ? 0 : iCount + 1].Active = "true";
        break;
      }
    }
  }


  PauseAndDisplay(requestType: string, action: string) {
    if (action === 'pause') {
      this.clearTimer(requestType);
      if (requestType === 'CAB') {
        this.showText_CAB = true;
      }
      else {
        this.showText_TRIP = true;
      }
    }
    else if (action === 'play') {
      this.resetTimer(requestType);
      if (requestType === 'CAB') {
        this['showText_' + requestType] = false;
      }
      else {
        this.showText_TRIP = false;
      }
    }
  }

  clearTimer(reqestType: string) {

    if (reqestType === this.cabReqestType) {
      if (this.timerId_CAB) {
        clearInterval(this.timerId_CAB);
      }
    }
    else if (reqestType === this.tripReqestType) {
      if (this.timerId_TRIP) {
        clearInterval(this.timerId_TRIP);
      }

    }
  }
}



