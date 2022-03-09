import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularMaterialsModule } from './shared/materials/materials/materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './Components/homepage/homepage/homepage.component';
import { RegisterComponent } from './Components/user/register/register.component';
import { LoginComponent } from './Components/user/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
