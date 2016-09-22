import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector    : "controles",
  templateUrl : "app/scripts/componentes/controles/controles.component.html"
})

export class ControlesComponent {

  @Output() controlesEvent = new EventEmitter<string>();
  private funcionTiempo;

  tick(){
    this.controlesEvent.emit("tick");
  }

  play(){
    window.clearInterval(this.funcionTiempo);//Se detiene cualquier otro ciclo anterior.
    this.funcionTiempo = window.setInterval(()=>{
      this.controlesEvent.emit("tick")
    }, 1);//El tiempo se echa a andar.
  }

  pause(){
    // this.controlesEvent.emit("pause");
  }

  reset(){
    this.controlesEvent.emit("exterminio");
  }

  stop(){
    window.clearInterval(this.funcionTiempo);
  }
}