import {Component, ViewChild, AfterViewInit} from "@angular/core";

import {Mapa} from "../../modelos/Mapa";
import {Lib} from "../../lib/lib";

@Component({
  selector    : "universo",
  templateUrl : "app/componentes/universo/universo.component.html"
})

export class UniversoComponent implements AfterViewInit, Pintable {

  private mapa : Mapa;
  private cantidadColonias : number = 0;
  private contexto : CanvasRenderingContext2D;
  private generaciones : number     = 0;

  private renglones : number      = 200;
  private columnas : number       = 200;
  private tamanoCelula : number   = 4;
  private espacioCelular : number = 0;
  private porcentajeVida : number = 0.4;

  constructor(){
    this.generarMapa(this.renglones, this.columnas, this.tamanoCelula, this.porcentajeVida, this.espacioCelular);
  }

  generarMapa(renglones, columnas, tamanoCelula, porcentajeVida, espacioCelular){
    this.renglones      = renglones;
    this.columnas       = columnas;
    this.tamanoCelula   = tamanoCelula;
    this.porcentajeVida = porcentajeVida;
    this.espacioCelular = espacioCelular;
    this.mapa           = new Mapa(renglones, columnas, tamanoCelula, porcentajeVida, espacioCelular);
    console.log("This mapa is: ", this.renglones, this.columnas);
  }

  @ViewChild("universo") universo;

  ngAfterViewInit() : void{
    let canvas : HTMLCanvasElement = this.universo.nativeElement;
    canvas.width                   = this.columnas * this.tamanoCelula;
    canvas.height                  = this.renglones * this.tamanoCelula;
    this.contexto                  = canvas.getContext("2d");
    this.mapa.generarVida();
    Lib.asyncMe(this.tick, this);
  }

  pintar() : void{
    this.mapa.pintar(this.contexto);
  }

  tick() : void{
    this.cantidadColonias = 0;
    this.mapa.reiniciarColonia();
    this.mapa.desfasarColonia();
    // this.mapa.recorrer(this.mapa.detectarColonia.bind(this.mapa));
    this.mapa.detectarColonias();
    this.generaciones = this.generaciones + 1;
    this.pintar();
  }

  controlesHandler($event){
    let self = this;
    console.log("Received: ", $event);

    switch ($event){
      case "tick" :
        self.tick();
        break;
      case "exterminio" :
        this.mapa.exterminarVida();
        // this.generarMapa();
        this.mapa.generarVida();
        this.tick();
        break;
      default :
        console.log("No");
    }
  }

}