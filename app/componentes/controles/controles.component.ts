import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector    : "controles",
  templateUrl : "app/componentes/controles/controles.component.html"
})

export class ControlesComponent {

  @Output() controlesEvent = new EventEmitter<string>();
  private funcionTiempo;

  tick(){
    this.controlesEvent.emit("tick");
  }

  play(){
    this.pause();
    this.funcionTiempo = window.setInterval(()=>{
      this.controlesEvent.emit("tick")
    }, 1);
  }

  pause(){
    window.clearInterval(this.funcionTiempo);
  }

  reset(){
    this.controlesEvent.emit("exterminio");
  }

  stop(){
    window.clearInterval(this.funcionTiempo);
  }
}