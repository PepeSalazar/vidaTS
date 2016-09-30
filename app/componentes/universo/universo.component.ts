import {Component, ViewChild, AfterViewInit} from "@angular/core";

import {Mapa} from "../../modelos/Mapa";
import {Celula} from "../../modelos/Celula";
import {ESTADO_CELULA} from "../../modelos/EstadoCelula";
import {Lib} from "../../lib/lib";

@Component({
  selector    : "universo",
  templateUrl : "app/componentes/universo/universo.component.html"
})

export class UniversoComponent implements AfterViewInit {

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
    this.mapa = new Mapa(this.renglones, this.columnas, this.tamanoCelula, this.porcentajeVida, this.espacioCelular);
    console.log("This mapa is: ", this.renglones, this.columnas);
  }

  @ViewChild("universo") universo;

  ngAfterViewInit() : void{
    let canvas : HTMLCanvasElement = this.universo.nativeElement;
    canvas.width                   = this.columnas * this.tamanoCelula;
    canvas.height                  = this.renglones * this.tamanoCelula;
    this.contexto                  = canvas.getContext("2d");
    this.generarVida();
    Lib.asyncMe(this.tick, this);
  }

  exterminarVida() : void{
    this.mapa.recorrer((celula : Celula) =>{
      celula.setEstado(ESTADO_CELULA.MUERTA);
    });
  }

  generarVida() : void{
    this.mapa.recorrer(function (celula : Celula){
      let estado = ESTADO_CELULA.VIVA;
      if(Lib.generarNumeroRandom(0, 1) === 0){
        estado = ESTADO_CELULA.MUERTA;
      }
      celula.setEstado(estado);
    });
  }

  pintar() : void{
    this.mapa.recorrer((celula : Celula) =>{
      celula.pintar(this.contexto);
    })
  }

  tick() : void{
    this.cantidadColonias = 0;
    this.mapa.recorrer((celula : Celula)=>{
      let vecinos = this.mapa.ContarVecinosVivos(celula);
      celula.setFantasma(celula.calcularEstado(vecinos));
      celula.setColonia(-1); // Reinica la colonia
    });
    this.mapa.recorrer(function (celula : Celula){
      celula.desfasar();
    });
    this.mapa.recorrer(this.mapa.detectarColonia.bind(this.mapa));
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
        this.exterminarVida();
        this.generarVida();
        this.tick();
        break;
      default :
        console.log("No");
    }
  }

}