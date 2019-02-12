import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

//material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';




//Servicios
import { DataApiService } from './services/data-api.service';
import { EventComponent } from './components/event/event.component';
import { DetailsEventComponent } from './components/details-event/details-event.component';
import { InscritosComponent } from './components/inscritos/inscritos.component';
import { ExcelService } from './services/excel.service';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeroComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    Page404Component,
    EventComponent,
    DetailsEventComponent,
    InscritosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [DataApiService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
