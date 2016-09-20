import {Component} from "@angular/core";

@Component({
  selector   : "my-app",
  template   : `<h1>{{title}}</h1>
                <controles (ticked)="uni.tick()"></controles>
                <universo #uni></universo>`,
})

export class AppComponent {
  title : string = "Angular 2 tutorial";
}
