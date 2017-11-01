import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpHandler} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { AppRoutingModule } from './app.routing';
import { Level0Guard } from './guards/level0.guard';
import { UserService } from './providers/user/user.service';
import { AuthGuard } from './guards/auth.guard';
import {environment} from "../environments/environment";
import {HttpClientService} from "./providers/http/http-client.service";
import { DashboardComponent } from './dashboard/dashboard.component';


const GUARDS = [
    {
        provide: 'Level0Guard',
        useClass: Level0Guard
    },
    {
        provide: 'AuthGuard',
        useClass: AuthGuard,
        deps: [UserService, Router]
    }
];


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    AppRoutingModule
  ],
  providers: [
      {
          provide: 'APIConfig',
          useValue: environment.API
      },
      {
          provide: LocationStrategy,
          useClass: HashLocationStrategy
      },
      {
          provide: 'HttpClientService',
          useFactory: function(httpHandler: HttpHandler) {
              return new HttpClientService(httpHandler, Injector);
          },
          deps: [HttpHandler]
      },
      ToasterService,
      UserService,
      ...GUARDS
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
