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

  static asignarColonia(celula : Celula, padre : Celula) : void{
    if(padre){
      celula.setColonia(padre.getColonia());
      return;
    }
    let colonia = Math.floor(Math.random() * (255));
    celula.setColonia(colonia);
  }

  detectarColonia(celula : Celula, padre : Celula) : void{
    let self = this;
    let vecinas : Celula[];
    if(celula.getColonia() !== -1){ return; }
    if(celula.getEstado() === ESTADO_CELULA.MUERTA){
      return;
    }

    UniversoComponent.asignarColonia(celula, padre);
    vecinas = self.mapa.obtenerCelulasVecinas(celula);
    vecinas.forEach(function (vecina){
      let esValida = Mapa.esCelulaVecinaValida(vecina, padre);
      if(esValida){
        self.detectarColonia(vecina, celula);
      }
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
    this.mapa.recorrer(this.detectarColonia.bind(this));
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