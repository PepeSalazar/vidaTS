import {Component} from "@angular/core";

@Component({
  selector : "my-app",
  template : "<h1>{{title}}</h1><universo></universo>"
})

export class AppComponent {
  title : string = "Juego de la vida";
}
