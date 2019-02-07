import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { EventComponent } from './components/event/event.component';
import { DetailsEventComponent } from './components/details-event/details-event.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/login', component: LoginComponent}, 
  {path: 'user/register', component: RegisterComponent}, 
  {path: 'user/profile', component: ProfileComponent},
  {path: 'event', component: EventComponent},
  {path: 'event/:slug', component: DetailsEventComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
