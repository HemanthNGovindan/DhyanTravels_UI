import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutes, AppComponents } from './app.routes';
import { APIService } from './functions/api/services';
import { ViewmoreDirective } from './functions/directives/viewmore.directive';
import { ViewNotifyDirective } from './functions/directives/view-notify.directive';
import { PostdateformatPipe, phoneClickPipe } from './functions/pipes/pipe';


@NgModule({
  declarations: [
    AppComponent,
    AppComponents,
    ViewmoreDirective,
    ViewNotifyDirective,
    PostdateformatPipe,
    phoneClickPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
