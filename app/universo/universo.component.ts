import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";

import {Mapa} from "app/modelos/Mapa";
import {Celula} from "app/modelos/Celula";
import {ESTADO_CELULA} from "app/modelos/EstadoCelula";

@Component({
  selector : "universo",
  template : `<canvas #universo class='universo')>NADNADNAD</canvas>`
})

export class UniversoComponent implements AfterViewInit {

  private contexto : CanvasRenderingContext2D;
  private mapa : Mapa;
  private cantidadGeneraciones : number = 0;
  private cantidadColonias : number     = 0;
  private contexto : CanvasRenderingContext2D;
  private generaciones : number;

  private renglones : number      = 100;
  private columnas : number       = 100;
  private tamCelulas : number     = 4;
  private espacioCelular : number = 0;
  private porcentajeVida : number = 0.4;

  // constructor(private renglones : number, private columnas : number, private tamCelulas : number, private espacioCelular : number, private porcentajeVida : number){
  //   this.renglones            = renglones;
  //   this.columnas             = columnas;
  //   this.tamCelulas           = tamCelulas;
  //   this.espacioCelular       = espacioCelular;
  //   this.porcentajeVida       = porcentajeVida;
  constructor(){
    this.mapa = new Mapa(100, 100, 4, 0.4);
    // let c : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("universo");
    // c.width                   = this.columnas * this.tamCelulas;
    // c.height                  = this.renglones * this.tamCelulas;
    // this.contexto             = c.getContext("2d");
  }

  @ViewChild("universo") universo;

  ngAfterViewInit(){ // wait for the view to init before using the element
    this.contexto = this.universo.nativeElement.getContext("2d");
  }

  exterminarVida(){
    this.mapa.recorrer((celula : Celula) =>{
      celula.setEstado(ESTADO_CELULA.MUERTA);
    });
  }

  generarVida(){
    this.mapa.recorrer(function (celula : Celula){
      let estado = ESTADO_CELULA.VIVA;
      if(UniversoComponent.generarNumeroRandom(0, 1) === 0){
        estado = ESTADO_CELULA.MUERTA
      }
      celula.setEstado(estado);
    });
  }

  detectarColonia(celula : Celula, padre : Celula){
    if(celula.getEstado() === ESTADO_CELULA.MUERTA){
      return;
    }
    if(celula.getColonia() >= -1){
      return;
    }
    UniversoComponent.asignarColonia(celula, padre);
    let vecinas : Celula[] = this.mapa.obtenerCelulasVecinas(celula);
    vecinas.forEach(function (vecina, index, array){
      if(this.esCelulaVecinaValida(vecina, padre)){
        this.detectarColonia(vecina, celula);
      }
    })
  }

  static asignarColonia(celula : Celula, padre : Celula) : void{
    if(typeof padre !== 'undefined'){
      celula.setColonia(padre.getColonia());
      return;
    }
    celula.setColonia(Math.random() * (255));
  }

  static generarNumeroRandom(min : number, max : number) : number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  pintarCambios() : void{
    this.mapa.recorrer((celula : Celula) =>{
      let x  = celula.getCoordenada().x * this.tamCelulas;//Calcula la posición de la célula en el canvas.
      let y  = celula.getCoordenada().y * this.tamCelulas;
      let x1 = this.tamCelulas - this.espacioCelular;
      let y1 = this.tamCelulas - this.espacioCelular;
      if(celula.getEstado() === ESTADO_CELULA.MUERTA){//Varía el colo de la célula de acuerdo a su estado.
        this.contexto.fillStyle = "#09C";
      } else if(celula.getEstado() === ESTADO_CELULA.VIVA){
        let cadena : string = Math.floor(celula.getColonia()).toString(16);
        cadena              = UniversoComponent.formatearCadena(cadena);
        if(cadena !== "00"){
          cadena = "#00CC" + cadena;
        } else {
          cadena = "#00CCFF";
        }
        this.contexto.fillStyle = cadena;
      }
      this.contexto.fillRect(x, y, x1, y1);
      if(celula.getColonia() !== -1){//Lo uso para desplegar información acerca de la célula.
        //console.log("Se pinta la célula:" + JSON.stringify(celula));
        //ctx.fillStyle = "#000";
        //ctx.font = "10px Arial";
        //ctx.fillText(celula.colonia, (x + tamCelulas / 2), (y + tamCelulas / 2));
      }
    })
  }

  /**
   * Verifica que la cadena tenga al menos dos caracteres.
   * @param cadena
   * @returns {string}
   */
  static formatearCadena(cadena : string){
    let cadenaFormateada = cadena;
    if(cadena.length < 2){
      cadenaFormateada = "0" + cadena;
    }
    return cadenaFormateada;
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
    this.mapa.recorrer(this.detectarColonia);
    this.generaciones = this.generaciones + 1;
    this.pintarCambios();
  }

}