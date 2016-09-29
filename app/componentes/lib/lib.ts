export class Lib {

  constructor(){
  }

  static asyncMe(miFuncion : Function, contexto : Object){
    setTimeout(miFuncion.bind(contexto), 0);
  }
}