"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Mapa_1 = require("../modelos/Mapa");
var EstadoCelula_1 = require("../modelos/EstadoCelula");
var UniversoComponent = (function () {
    // constructor(private renglones : number, private columnas : number, private tamCelulas : number, private espacioCelular : number, private porcentajeVida : number){
    //   this.renglones            = renglones;
    //   this.columnas             = columnas;
    //   this.tamCelulas           = tamCelulas;
    //   this.espacioCelular       = espacioCelular;
    //   this.porcentajeVida       = porcentajeVida;
    function UniversoComponent() {
        this.cantidadGeneraciones = 0;
        this.cantidadColonias = 0;
        this.renglones = 100;
        this.columnas = 100;
        this.tamCelulas = 4;
        this.espacioCelular = 0;
        this.porcentajeVida = 0.4;
        this.mapa = new Mapa_1.Mapa(100, 100, 4, 0.4);
        // let c : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("universo");
        // c.width                   = this.columnas * this.tamCelulas;
        // c.height                  = this.renglones * this.tamCelulas;
        // this.contexto             = c.getContext("2d");
    }
    UniversoComponent.prototype.ngAfterViewInit = function () {
        var canvas = this.universo.nativeElement;
        this.contexto = canvas.getContext("2d");
    };
    UniversoComponent.prototype.exterminarVida = function () {
        this.mapa.recorrer(function (celula) {
            celula.setEstado(EstadoCelula_1.ESTADO_CELULA.MUERTA);
        });
    };
    UniversoComponent.prototype.generarVida = function () {
        this.mapa.recorrer(function (celula) {
            var estado = EstadoCelula_1.ESTADO_CELULA.VIVA;
            if (UniversoComponent.generarNumeroRandom(0, 1) === 0) {
                estado = EstadoCelula_1.ESTADO_CELULA.MUERTA;
            }
            celula.setEstado(estado);
        });
    };
    UniversoComponent.prototype.detectarColonia = function (celula, padre) {
        if (celula.getEstado() === EstadoCelula_1.ESTADO_CELULA.MUERTA) {
            return;
        }
        if (celula.getColonia() >= -1) {
            return;
        }
        UniversoComponent.asignarColonia(celula, padre);
        var vecinas = this.mapa.obtenerCelulasVecinas(celula);
        vecinas.forEach(function (vecina, index, array) {
            if (this.esCelulaVecinaValida(vecina, padre)) {
                this.detectarColonia(vecina, celula);
            }
        });
    };
    UniversoComponent.asignarColonia = function (celula, padre) {
        if (typeof padre !== 'undefined') {
            celula.setColonia(padre.getColonia());
            return;
        }
        celula.setColonia(Math.random() * (255));
    };
    UniversoComponent.generarNumeroRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    UniversoComponent.prototype.pintarCambios = function () {
        var _this = this;
        this.mapa.recorrer(function (celula) {
            var x = celula.getCoordenada().x * _this.tamCelulas; //Calcula la posición de la célula en el canvas.
            var y = celula.getCoordenada().y * _this.tamCelulas;
            var x1 = _this.tamCelulas - _this.espacioCelular;
            var y1 = _this.tamCelulas - _this.espacioCelular;
            if (celula.getEstado() === EstadoCelula_1.ESTADO_CELULA.MUERTA) {
                _this.contexto.fillStyle = "#09C";
            }
            else if (celula.getEstado() === EstadoCelula_1.ESTADO_CELULA.VIVA) {
                var cadena = Math.floor(celula.getColonia()).toString(16);
                cadena = UniversoComponent.formatearCadena(cadena);
                if (cadena !== "00") {
                    cadena = "#00CC" + cadena;
                }
                else {
                    cadena = "#00CCFF";
                }
                _this.contexto.fillStyle = cadena;
            }
            _this.contexto.fillRect(x, y, x1, y1);
            if (celula.getColonia() !== -1) {
            }
        });
    };
    /**
     * Verifica que la cadena tenga al menos dos caracteres.
     * @param cadena
     * @returns {string}
     */
    UniversoComponent.formatearCadena = function (cadena) {
        var cadenaFormateada = cadena;
        if (cadena.length < 2) {
            cadenaFormateada = "0" + cadena;
        }
        return cadenaFormateada;
    };
    UniversoComponent.prototype.tick = function () {
        var _this = this;
        this.cantidadColonias = 0;
        this.mapa.recorrer(function (celula) {
            var vecinos = _this.mapa.ContarVecinosVivos(celula);
            celula.setFantasma(celula.calcularEstado(vecinos));
            celula.setColonia(-1); // Reinica la colonia
        });
        this.mapa.recorrer(function (celula) {
            celula.desfasar();
        });
        this.mapa.recorrer(this.detectarColonia);
        this.generaciones = this.generaciones + 1;
        this.pintarCambios();
    };
    __decorate([
        core_1.ViewChild("universo")
    ], UniversoComponent.prototype, "universo");
    UniversoComponent = __decorate([
        core_1.Component({
            selector: "universo",
            template: "<canvas #universo)></canvas>"
        })
    ], UniversoComponent);
    return UniversoComponent;
}());
exports.UniversoComponent = UniversoComponent;
//# sourceMappingURL=universo.component.js.map