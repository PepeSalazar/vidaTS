import {Celula} from "./Celula"
import {Coordenada} from "./Coordenada"
import {ESTADO_CELULA} from "./EstadoCelula"

export class Mapa {
  private celulas : Celula[][];

  constructor(private renglones : number = 20,
              private columnas : number = 20,
              private tamanoCelula : number = 4,
              private porcentajeVida : number = 0.4){
    this.renglones      = renglones;
    this.columnas       = columnas;
    this.tamanoCelula   = tamanoCelula;
    this.porcentajeVida = porcentajeVida;

    this.celulas =  new Array(this.renglones);

    for (let x : number = 0; x < this.renglones; x++){
      this.celulas[x] = new Array(this.columnas);
      for (let y : number = 0; y < this.columnas; y++){
        let identificador  = ((x * this.columnas) + y);
        this.celulas[x][y] = new Celula(identificador, new Coordenada(x, y), ESTADO_CELULA.MUERTA, -1);
      }
    }
  }

  getCelula(x : number, y : number) : Celula{
    let celula = this.celulas[x][y];
    if(!celula){
      return new Celula();
    }
    return celula;
  }

  recorrer(funcion : Function){
    for (let i : number = 0; i < this.renglones; i++){
      this.celulas[i] = [];
      for (let j : number = 0; j < this.columnas; j++){
        funcion(this.celulas[i][j]);
      }
    }
  }

  //Si es célula vecina válida y viva, y no su padre.
  esCelulaVecinaValida(celula : Celula, padre : Celula){
    return celula.getId() !== -1 && celula.getEstado() === ESTADO_CELULA.VIVA && celula.isEqual(padre);
  }

  obtenerCelulasVecinas(celula : Celula){
    let vecinos : Celula []     = [];
    let coordenada : Coordenada = celula.getCoordenada();
    let getCelula               = this.getCelula;
    vecinos.push(getCelula(coordenada.x - 1, coordenada.y - 1));
    vecinos.push(getCelula(coordenada.x - 1, coordenada.y));
    vecinos.push(getCelula(coordenada.x - 1, coordenada.y + 1));
    vecinos.push(getCelula(coordenada.x, coordenada.y - 1));
    vecinos.push(getCelula(coordenada.x, coordenada.y + 1));
    vecinos.push(getCelula(coordenada.x + 1, coordenada.y - 1));
    vecinos.push(getCelula(coordenada.x + 1, coordenada.y));
    vecinos.push(getCelula(coordenada.x + 1, coordenada.y + 1));
    return vecinos;
  }

  ContarVecinosVivos(celula : Celula) : number{
    let contadorVecinos : number = 0;
    let vecinos : Celula[]       = this.obtenerCelulasVecinas(celula);
    vecinos.forEach((vecino, index, vecinos)=>{
      if(vecino.getId() !== -1 && vecino.getEstado() === ESTADO_CELULA.VIVA){
        contadorVecinos++;
      }
    });
    return contadorVecinos;
  }
}