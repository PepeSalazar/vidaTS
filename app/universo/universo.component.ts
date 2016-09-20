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

  private renglones : number      = 30;
  private columnas : number       = 30;
  private tamCelulas : number     = 4;
  private espacioCelular : number = 0;
  private porcentajeVida : number = 0.4;

  // constructor(private renglones : number, private columnas : number, private tamCelulas : number, private espacioCelular : number, private porcentajeVida : number){
  constructor(){
    this.mapa = new Mapa(this.renglones, this.columnas, this.tamCelulas, this.porcentajeVida);
    console.log("This mapa is: ", this.renglones, this.columnas);
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
    if(padre){
      celula.setColonia(padre.getColonia());
      return;
    }
    let colonia = Math.floor(Math.random() * (255));
    celula.setColonia(colonia);
  }

  detectarColonia(celula : Celula, padre : Celula){
    let self = this;
    let vecinas : Celula[];
    if(celula.getColonia() !== -1){ return; }
    if(celula.getEstado() === ESTADO_CELULA.MUERTA){
      return;
    }

    UniversoComponent.asignarColonia(celula, padre);
    vecinas = self.mapa.obtenerCelulasVecinas(celula);
    vecinas.forEach(function (vecina, index, array){
      let esValida = Mapa.esCelulaVecinaValida(vecina, padre);
      if(esValida){
        self.detectarColonia(vecina, celula);
      }
    });

  }

  static generarNumeroRandom(min : number, max : number) : number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  pintarCambios() : void{
    this.mapa.recorrer((celula : Celula) =>{
      this.pintarCelula(celula);
    })
  }

  pintarCelula(celula : Celula){
    let x : number            = celula.getCoordenada().x * this.tamCelulas;//Calcula la posición de la célula en el canvas.
    let y : number            = celula.getCoordenada().y * this.tamCelulas;
    let celulaWidth : number  = this.tamCelulas - this.espacioCelular;
    let celulaHeight : number = this.tamCelulas - this.espacioCelular;

    this.contexto.fillStyle = this.seleccionarColor(celula);
    this.contexto.fillRect(x, y, celulaWidth, celulaHeight);

    // this.contexto.fillStyle = "#000";
    // this.contexto.font      = "10px Arial";
    // this.contexto.fillText(celula.getId().toString(), (x + this.tamCelulas / 2), (y + this.tamCelulas / 2));
  }

  seleccionarColor(celula : Celula) : string{
    let estado = celula.getEstado();

    if(estado === ESTADO_CELULA.MUERTA){ return "#09C"; }
    if(estado === ESTADO_CELULA.SELECCIONADA){ return "#FF0"; }

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
      celula.setColonia(-1); // Reinica la colonia
    });
    this.mapa.recorrer(function (celula : Celula){
      celula.desfasar();
    });
    this.mapa.recorrer(this.detectarColonia.bind(this));
    this.generaciones = this.generaciones + 1;
    this.pintarCambios();
  }

}