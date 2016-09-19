import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AppComponent}  from './app.component';
import {UniversoComponent}  from './universo/universo.component';

@NgModule({
  imports      : [
    BrowserModule,
    FormsModule
  ],
  declarations : [
    AppComponent, UniversoComponent
  ],
  bootstrap    : [AppComponent]
})

export class AppModule {
}