import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { MoviesComponent } from './movies/movies.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from 'src/app/movies.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FilterPipe} from './filter.pipe'
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'main', component: MainComponent,  resolve: { data: UserResolver}}
];



@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HeaderComponent,
    MapComponent,
    MoviesComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    MDBBootstrapModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3FQZhMHSjlgZ1GlA_EPlOp-7DWSInsWU'
    })
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
