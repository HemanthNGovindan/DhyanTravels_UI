import { Component, OnInit } from '@angular/core';
import { APIService } from '../../functions/api/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public LinkItems: Array<object>;
  private subscription: Subscription;
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

  AssignValues() {
    this.LinkItems = this.APIService.PageContent.Content.LinkItems;
  }
}