import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  private LoaderControlCount: number;
  private LoaderAnimationTime: string;
  private LoaderControls: Array<any>;
  private LoaderAnimationDelay: number;
  private LoaderColur: string;
  private LoaderSize: string;
  @Input()
  public ShowLoader: boolean = true;

  constructor() {
    this.SetLoaderValues(3, '1', 0.15, '#ffd205', '50');
  }

  SetLoaderValues = function (LoaderControlCount: number = 3, LoaderAnimationTime: string = '1', LoaderAnimationDelay: number = 0.15, LoaderColur: string = "", LoaderSize: string = "50") {
    this.LoaderControlCount = LoaderControlCount;
    this.LoaderAnimationTime = LoaderAnimationTime;
    this.LoaderAnimationDelay = LoaderAnimationDelay;
    this.LoaderColur = LoaderColur;
    this.LoaderSize = LoaderSize;
    this.LoaderControls = new Array(this.LoaderControlCount);
    let delayDifference = 0;

    for (let iCount = 0; iCount < this.LoaderControls.length; iCount++) {
      delayDifference = (delayDifference < (delayDifference + this.LoaderAnimationDelay)) ? delayDifference + this.LoaderAnimationDelay : this.LoaderAnimationDelay;
      this.LoaderControls[iCount] = { 'DelayTime': delayDifference + '' };
    }
  }

  ngOnInit() {
  }

  SetLoaderVisibile = function (value: boolean = false) {
    this.ShowLoader = value;
  }

}
