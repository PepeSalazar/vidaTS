import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector : "controles",
  templateUrl : "app/controles/controles.component.html"
})

export class ControlesComponent {

  @Output() ticked = new EventEmitter<string>();
  tick() {
    this.ticked.emit("Ticked");
    console.log("Ticking");
  }
}