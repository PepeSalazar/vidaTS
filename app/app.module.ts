import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AppComponent}  from './main/app.component';
import {UniversoComponent}  from './universo/universo.component';
import {ControlesComponent} from './controles/controles.component'

@NgModule({
  imports      : [
    BrowserModule,
    FormsModule
  ],
  declarations : [
    AppComponent, UniversoComponent, ControlesComponent
  ],
  bootstrap    : [AppComponent]
})

export class AppModule {
}