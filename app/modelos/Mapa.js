"use strict";
var Celula_1 = require("./Celula");
var Coordenada_1 = require("./Coordenada");
var EstadoCelula_1 = require("./EstadoCelula");
var Mapa = (function () {
    function Mapa(renglones, columnas, tamanoCelula, porcentajeVida) {
        if (renglones === void 0) { renglones = 20; }
        if (columnas === void 0) { columnas = 20; }
        if (tamanoCelula === void 0) { tamanoCelula = 4; }
        if (porcentajeVida === void 0) { porcentajeVida = 0.4; }
        this.renglones = renglones;
        this.columnas = columnas;
        this.tamanoCelula = tamanoCelula;
        this.porcentajeVida = porcentajeVida;
        this.renglones = renglones;
        this.columnas = columnas;
        this.tamanoCelula = tamanoCelula;
        this.porcentajeVida = porcentajeVida;
        this.celulas = new Array(this.renglones);
        for (var x = 0; x < this.renglones; x++) {
            this.celulas[x] = new Array(this.columnas);
            for (var y = 0; y < this.columnas; y++) {
                var identificador = ((x * this.columnas) + y);
                this.celulas[x][y] = new Celula_1.Celula(identificador, new Coordenada_1.Coordenada(x, y), EstadoCelula_1.ESTADO_CELULA.MUERTA, -1);
            }
        }
    }
    Mapa.prototype.getCelula = function (x, y) {
        var celula = this.celulas[x][y];
        if (!celula) {
            return new Celula_1.Celula();
        }
        return celula;
    };
    Mapa.prototype.recorrer = function (funcion) {
        for (var i = 0; i < this.renglones; i++) {
            this.celulas[i] = [];
            for (var j = 0; j < this.columnas; j++) {
                funcion(this.celulas[i][j]);
            }
        }
    };
    //Si es célula vecina válida y viva, y no su padre.
    Mapa.prototype.esCelulaVecinaValida = function (celula, padre) {
        return celula.getId() !== -1 && celula.getEstado() === EstadoCelula_1.ESTADO_CELULA.VIVA && celula.isEqual(padre);
    };
    Mapa.prototype.obtenerCelulasVecinas = function (celula) {
        var vecinos = [];
        var coordenada = celula.getCoordenada();
        var getCelula = this.getCelula;
        vecinos.push(getCelula(coordenada.x - 1, coordenada.y - 1));
        vecinos.push(getCelula(coordenada.x - 1, coordenada.y));
        vecinos.push(getCelula(coordenada.x - 1, coordenada.y + 1));
        vecinos.push(getCelula(coordenada.x, coordenada.y - 1));
        vecinos.push(getCelula(coordenada.x, coordenada.y + 1));
        vecinos.push(getCelula(coordenada.x + 1, coordenada.y - 1));
        vecinos.push(getCelula(coordenada.x + 1, coordenada.y));
        vecinos.push(getCelula(coordenada.x + 1, coordenada.y + 1));
        return vecinos;
    };
    Mapa.prototype.ContarVecinosVivos = function (celula) {
        var contadorVecinos = 0;
        var vecinos = this.obtenerCelulasVecinas(celula);
        vecinos.forEach(function (vecino, index, vecinos) {
            if (vecino.getId() !== -1 && vecino.getEstado() === EstadoCelula_1.ESTADO_CELULA.VIVA) {
                contadorVecinos++;
            }
        });
        return contadorVecinos;
    };
    return Mapa;
}());
exports.Mapa = Mapa;
//# sourceMappingURL=Mapa.js.map