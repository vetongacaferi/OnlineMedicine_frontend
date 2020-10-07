import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { LeftNavbarMenuComponent } from './admin/left-navbar-menu/left-navbar-menu.component';
import { MedicineComponent } from './admin/medicine/medicine-list/medicine.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PharmacyComponent } from './admin/pharmacy/pharmacy-list/pharmacy.component';
import { PharmacyAddEditComponent } from './admin/pharmacy/pharmacy-addedit/pharmacy-addedit.component';
import { MedicineAddeditComponent } from './admin/medicine/medicine-addedit/medicine-addedit.component';
import { PharmacyMedicinesComponent } from './admin/pharmacy/pharmacy-medicines/pharmacy-medicines.component';
import { RegisterComponent } from './register/register.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ProfileComponent } from './admin/Settings/profile/profile.component';
import { ActivitylogComponent } from './admin/Settings/activitylog/activitylog.component';
import { SafeHtmlPipe } from './pipe/SafeHtml.pipe';
import { SharedModule } from './shared/shared.module';


@NgModule({
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      LeafletModule.forRoot(),
      SharedModule,
      routing,
   ],
   declarations: [
      AppComponent,
      HomeComponent,
      AdminComponent,
      LoginComponent,
      LeftNavbarMenuComponent,
      DashboardComponent,
      MedicineComponent,
      PharmacyComponent,
      PharmacyAddEditComponent,
      MedicineAddeditComponent,
      PharmacyMedicinesComponent,
      RegisterComponent,
      ProfileComponent,
      ActivitylogComponent,
      SafeHtmlPipe,
   ],
   providers: [
      
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }