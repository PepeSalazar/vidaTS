import {Celula} from "./Celula"
import {Coordenada} from "./Coordenada"
import {ESTADO_CELULA} from "./EstadoCelula"
import {Lib} from "../lib/lib";

export class Mapa implements Pintable{
  private celulas : Celula[][];

  constructor(private renglones : number = 20,
              private columnas : number = 20,
              private tamanoCelula : number = 4,
              private porcentajeVida : number = 0.4,
              private espacioCelular : number = 0){
    this.renglones      = renglones;
    this.columnas       = columnas;
    this.tamanoCelula   = tamanoCelula;
    this.porcentajeVida = porcentajeVida;
    this.espacioCelular = espacioCelular;

    this.celulas = new Array(this.renglones);

    for (let x : number = 0; x < this.renglones; x++){
      this.celulas[x] = new Array(this.columnas);
      for (let y : number = 0; y < this.columnas; y++){
        let identificador  = ((x * this.columnas) + y);
        this.celulas[x][y] = new Celula(identificador, new Coordenada(x, y), ESTADO_CELULA.MUERTA, -1, this.tamanoCelula, this.espacioCelular);
      }
    }
  }

  enElMapa(x : number, y : number) : boolean{
    return !!(x >= 0 && y >= 0 && x < this.renglones && y < this.columnas);
  }

  getCelula(x : number, y : number) : Celula{
    let celula : Celula;
    let existe = this.enElMapa(x, y);
    if(existe){
      celula = this.celulas[x][y];
    } else {
      celula = new Celula();
    }
    return celula;
  }

  recorrer(funcion : Function){
    for (let i : number = 0; i < this.renglones; i++){
      for (let j : number = 0; j < this.columnas; j++){
        funcion(this.celulas[i][j]);
      }
    }
  }

  //Si es célula vecina válida y viva, y no su padre.
  static esCelulaVecinaValida(celula : Celula, padre : Celula){
    return (celula.getId() !== -1 && celula.getEstado() === ESTADO_CELULA.VIVA && !celula.esIgual(padre));
  }

  obtenerCelulasVecinas(celula : Celula){
    let vecinos : Celula []     = [];
    let coordenada : Coordenada = celula.getCoordenada();
    vecinos.push(this.getCelula(coordenada.x - 1, coordenada.y - 1));
    vecinos.push(this.getCelula(coordenada.x - 1, coordenada.y));
    vecinos.push(this.getCelula(coordenada.x - 1, coordenada.y + 1));
    vecinos.push(this.getCelula(coordenada.x, coordenada.y - 1));
    vecinos.push(this.getCelula(coordenada.x, coordenada.y + 1));
    vecinos.push(this.getCelula(coordenada.x + 1, coordenada.y - 1));
    vecinos.push(this.getCelula(coordenada.x + 1, coordenada.y));
    vecinos.push(this.getCelula(coordenada.x + 1, coordenada.y + 1));
    return vecinos;
  }

  ContarVecinosVivos(celula : Celula) : number{
    let contadorVecinos : number = 0;
    let vecinos : Celula[]       = this.obtenerCelulasVecinas(celula);
    vecinos.forEach((vecino)=>{
      if(vecino.getId() !== -1 && vecino.getEstado() === ESTADO_CELULA.VIVA){
        contadorVecinos++;
      }
    });
    return contadorVecinos;
  }

  static asignarColonia(celula : Celula, padre : Celula) : void{
    if(padre){
      celula.setColonia(padre.getColonia());
      return;
    }
    let colonia = Math.floor(Math.random() * (255));
    celula.setColonia(colonia);
  }

  public detectarColonias(){
    this.recorrer(this.detectarColonia.bind(this));
  }

  detectarColonia(celula : Celula, padre : Celula) : void{
    let self = this;
    let vecinas : Celula[];
    if(celula.getColonia() !== -1){ return; }
    if(celula.getEstado() === ESTADO_CELULA.MUERTA){
      return;
    }

    Mapa.asignarColonia(celula, padre);
    vecinas = self.obtenerCelulasVecinas(celula);
    vecinas.forEach(function (vecina){
      let esValida = Mapa.esCelulaVecinaValida(vecina, padre);
      if(esValida){
        self.detectarColonia(vecina, celula);
      }
    });
  }

  public exterminarVida() : void{
    this.recorrer((celula : Celula) =>{
      celula.setEstado(ESTADO_CELULA.MUERTA);
    });
  }

  public generarVida() : void{
    this.recorrer(function (celula : Celula){
      let estado = ESTADO_CELULA.VIVA;
      if(Lib.generarNumeroRandom(0, 1) === 0){
        estado = ESTADO_CELULA.MUERTA;
      }
      celula.setEstado(estado);
    });
  }

  public reiniciarColonia(){
    this.recorrer((celula : Celula)=>{
      let vecinos = this.ContarVecinosVivos(celula);
      celula.setFantasma(celula.calcularEstado(vecinos));
      celula.setColonia(-1); // Reinica la colonia
    })
  }

  public desfasarColonia(){
    this.recorrer((celula : Celula)=>{
      celula.desfasar();
    })
  }

  public pintar(contexto : CanvasRenderingContext2D) : void{
    this.recorrer((celula : Celula) =>{
      celula.pintar(contexto);
    })
  }
}