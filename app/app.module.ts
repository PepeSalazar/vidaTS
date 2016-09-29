import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AppComponent}  from './componentes/main/app.component';
import {UniversoComponent}  from './componentes/universo/universo.component';
import {ControlesComponent} from './componentes/controles/controles.component'

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