export class Coordenada {
  constructor(public x : number = 1, public y : number = -1){
    this.x = x;
    this.y = y;
  }

  isEqual(otra : Coordenada) : boolean{
    if(!otra){ return false; }
    if(otra.x !== this.x){ return false; }
    if(otra.y !== this.y){ return false; }
    return true;
  }
}