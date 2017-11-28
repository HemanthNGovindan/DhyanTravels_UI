import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';

// Functionalities
import { CarouselComponent } from './functions/components/carousel/carousel.component';
import { LoaderComponent } from './functions/components/loader/loader.component';


const routes: Routes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'Cabs', component: VehiclesComponent },
    { path: 'AboutUs', component: AboutUsComponent },
    { path: 'ContactUs', component: ContactUsComponent },
    { path: 'Error', component: ErrorComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutes { }
export const AppComponents = [
    MenuComponent,
    HomeComponent,
    FooterComponent,
    VehiclesComponent,
    AboutUsComponent,
    ContactUsComponent,
    ErrorComponent,
    CarouselComponent,
    LoaderComponent
];


