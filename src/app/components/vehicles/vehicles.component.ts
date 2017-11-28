import { Component, OnInit } from '@angular/core';
import { APIService } from '../../functions/api/services';
import { Vehicle } from '../../models/models';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  private subscription: Subscription;


  private Vehicles: Vehicle[];
  constructor(public APIService: APIService, private route: Router) {

    this.subscription = this.APIService.sericeResponded$.subscribe(
      data => {
        this.AssignValues();
      });
  }

  ngOnInit() {
    this.AssignValues();
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  SelectVehicle(cab) {
    this.route.navigate(['/Home'], { queryParams: { CABID: cab.Title } });
    var data = { 'AppData': this.APIService.AppData };
    data.AppData
    this.APIService.AppData = data.AppData;
  }
  AssignValues() {
    if (this.APIService.PageContent.Content !== undefined && this.APIService.PageContent.Content.Vehicles) {

      this.Vehicles = this.APIService.PageContent.Content.Vehicles;
    }
  }
}
