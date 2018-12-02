import { Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import { RouterModule} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component'
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'main', component: MainComponent,  resolve: { data: UserResolver}}
];
