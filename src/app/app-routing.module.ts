import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FutureComponent } from './future/future.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { TodayComponent } from './today/today.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'home', component:HomeComponent },
  { path: 'today', component:TodayComponent },
  { path: 'future', component:FutureComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }