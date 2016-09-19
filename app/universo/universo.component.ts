import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";

import {Mapa} from "../modelos/Mapa";
import {Celula} from "../modelos/Celula";
import {ESTADO_CELULA} from "../modelos/EstadoCelula";

@Component({
  selector    : "universo",
  templateUrl : "app/universo/universo.component.html"
})

export class UniversoComponent implements AfterViewInit {

  private mapa : Mapa;
  private cantidadGeneraciones : number = 0;
  private cantidadColonias : number     = 0;
  private contexto : CanvasRenderingContext2D;
  private generaciones : number;

  private renglones : number      = 20;
  private columnas : number       = 20;
  private tamCelulas : number     = 4;
  private espacioCelular : number = 0;
  private porcentajeVida : number = 0.4;

  // constructor(private renglones : number, private columnas : number, private tamCelulas : number, private espacioCelular : number, private porcentajeVida : number){
  constructor(){
    this.mapa = new Mapa(50, 50, 4, 0.4);
  }

  @ViewChild("universo") universo;

  ngAfterViewInit(){
    let canvas : HTMLCanvasElement = this.universo.nativeElement;
    canvas.width                   = this.columnas * this.tamCelulas;
    canvas.height                  = this.renglones * this.tamCelulas;
    this.contexto                  = canvas.getContext("2d");
    this.generarVida();
    this.tick();
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
        estado = ESTADO_CELULA.MUERTA;
      }
      celula.setEstado(estado);
    });
  }

  static asignarColonia(celula : Celula, padre : Celula) : void{
    if(typeof padre !== 'undefined'){
      celula.setColonia(padre.getColonia());
      return;
    }
    let colonia = Math.floor(Math.random() * (255));
    celula.setColonia(colonia);
  }

  detectarColonia(celula : Celula, padre : Celula){
    if(celula.getEstado() === ESTADO_CELULA.MUERTA){
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

  static generarNumeroRandom(min : number, max : number) : number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  pintarCambios() : void{
    this.mapa.recorrer((celula : Celula) =>{
      let x : number            = celula.getCoordenada().x * this.tamCelulas;//Calcula la posición de la célula en el canvas.
      let y : number            = celula.getCoordenada().y * this.tamCelulas;
      let celulaWidth : number  = this.tamCelulas - this.espacioCelular;
      let celulaHeight : number = this.tamCelulas - this.espacioCelular;

      this.contexto.fillStyle = this.seleccionarColor(celula);
      console.log("Color es : ", this.seleccionarColor(celula));
      this.contexto.fillRect(x, y, celulaWidth, celulaHeight);
      if(celula.getColonia() !== -1){//Lo uso para desplegar información acerca de la célula.
        //console.log("Se pinta la célula:" + JSON.stringify(celula));
        //ctx.fillStyle = "#000";
        //ctx.font = "10px Arial";
        //ctx.fillText(celula.colonia, (x + tamCelulas / 2), (y + tamCelulas / 2));
      }
    })
  }

  seleccionarColor(celula : Celula) : string{
    let estado = celula.getEstado();

    if(estado === ESTADO_CELULA.MUERTA){ return "#09C"; }

    let cadena : string = Math.floor(celula.getColonia()).toString(16);
    cadena              = UniversoComponent.formatearCadena(cadena);
    if(cadena !== "00"){
      cadena = "#00CC" + cadena;
    } else {
      cadena = "#00CCFF";
    }
    return cadena;
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
      // celula.setColonia(-1); // Reinica la colonia
      celula.setColonia(100); // Por de mientras ponemos la misma colonia, pues la recursion sucks.
    });
    this.mapa.recorrer(function (celula : Celula){
      celula.desfasar();
    });
    // this.mapa.recorrer(this.detectarColonia);
    this.generaciones = this.generaciones + 1;
    this.pintarCambios();
  }

}