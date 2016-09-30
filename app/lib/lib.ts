import {Celula} from "../modelos/Celula";
import {ESTADO_CELULA} from "../modelos/EstadoCelula";

export class Lib {

  constructor(){
  }

  /**
   * Manda una función a la cola de cosas asíncronas.
   * @param miFuncion
   * @param contexto
   */
  static asyncMe(miFuncion : Function, contexto : Object){
    setTimeout(miFuncion.bind(contexto), 0);
  }

  /**
   * Genera número random entre 1 y 0. Aproximádamente 50% de chance de cada valor.
   * @param min
   * @param max
   * @return {number}
   */
  static generarNumeroRandom(min : number, max : number) : number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Selecciona el color de las celulas para mostrar.
   * @param celula
   * @return {string}
   */
  static seleccionarColor(celula : Celula) : string{
    let estado = celula.getEstado();

    if(estado === ESTADO_CELULA.MUERTA){ return "#09C"; }
    if(estado === ESTADO_CELULA.SELECCIONADA){ return "#FF0"; }

    let cadena : string = Math.floor(celula.getColonia()).toString(16);
    cadena              = Lib.formatearCadena(cadena);
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
  static formatearCadena(cadena : string) : string{
    let cadenaFormateada = cadena;
    if(cadena.length < 2){
      cadenaFormateada = "0" + cadena;
    }
    return cadenaFormateada;
  }
}