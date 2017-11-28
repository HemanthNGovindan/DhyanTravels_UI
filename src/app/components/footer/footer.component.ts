import { Component, OnInit } from '@angular/core';
import { APIService } from '../../functions/api/services';
import { Subscription } from 'rxjs/Subscription';
import { ReplacingStringValues } from '../../functions/constants';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public LinkItems: any;
  public Copyright: string;
  private subscription: Subscription;
  public CurrentYear: string;
  public constructor(public APIService: APIService) {
    this.subscription = this.APIService.sericeResponded$.subscribe(
      data => {
        this.LinkItems = this.APIService.PageContent.Content.LinkItems;
        this.Copyright = this.APIService.PageContent.Content.PageText.Copyright;
        this.Copyright = (this.Copyright) ? this.Copyright.replace(ReplacingStringValues.CURRENTYEAR, new Date().getFullYear().toString()) : '';
      });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
