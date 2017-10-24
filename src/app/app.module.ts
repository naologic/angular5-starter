import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent
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
          provide: LocationStrategy,
          useClass: HashLocationStrategy
      },
      ToasterService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
