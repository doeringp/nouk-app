import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FirstNamesModule } from './firstnames/firstnames.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirstNamesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
