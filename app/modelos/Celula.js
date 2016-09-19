"use strict";
var Coordenada_1 = require("./Coordenada");
var EstadoCelula_1 = require("./EstadoCelula");
var Celula = (function () {
    function Celula(id, coordenada, estado, colonia) {
        if (id === void 0) { id = -1; }
        if (coordenada === void 0) { coordenada = new Coordenada_1.Coordenada(); }
        if (estado === void 0) { estado = EstadoCelula_1.ESTADO_CELULA.MUERTA; }
        if (colonia === void 0) { colonia = -1; }
        this.id = id;
        this.coordenada = coordenada;
        this.estado = estado;
        this.colonia = colonia;
        this.id = id;
        this.coordenada = coordenada;
        this.estado = estado;
        this.colonia = colonia;
    }
    Celula.prototype.setEstado = function (estado) {
        this.estado = estado;
    };
    Celula.prototype.getEstado = function () {
        return this.estado;
    };
    Celula.prototype.setColonia = function (idColonia) {
        this.colonia = idColonia;
    };
    Celula.prototype.getColonia = function () {
        return this.colonia;
    };
    Celula.prototype.getId = function () {
        return this.id;
    };
    Celula.prototype.getCoordenada = function () {
        return this.coordenada;
    };
    Celula.prototype.setCoordenada = function (value) {
        this.coordenada = value;
    };
    Celula.prototype.isEqual = function (otra) {
        if (!otra) {
            return false;
        }
        if (!otra.getCoordenada().isEqual(this.getCoordenada())) {
            return false;
        }
        return true;
    };
    Celula.prototype.setFantasma = function (fantasma) {
        this.fantasma = fantasma;
    };
    Celula.prototype.desfasar = function () {
        this.estado = this.fantasma;
    };
    Celula.prototype.calcularEstado = function (vecinosVivos) {
        var nuevoEstado = EstadoCelula_1.ESTADO_CELULA.MUERTA;
        var b = 3; //3
        var s = [2, 3]; //2,3
        if (vecinosVivos < s[0] && this.estado === EstadoCelula_1.ESTADO_CELULA.VIVA) {
            nuevoEstado = EstadoCelula_1.ESTADO_CELULA.MUERTA; // Muere de soledad
        }
        if ((vecinosVivos === s[0] || vecinosVivos === s[1]) && this.estado === EstadoCelula_1.ESTADO_CELULA.VIVA) {
            nuevoEstado = EstadoCelula_1.ESTADO_CELULA.VIVA; // Se queda viva
        }
        if (vecinosVivos > s[1] && this.estado === EstadoCelula_1.ESTADO_CELULA.VIVA) {
            nuevoEstado = EstadoCelula_1.ESTADO_CELULA.MUERTA; // Se muere por sobrepoblación
        }
        if (vecinosVivos === b && this.estado === EstadoCelula_1.ESTADO_CELULA.MUERTA) {
            nuevoEstado = EstadoCelula_1.ESTADO_CELULA.VIVA; //Revive por reproducción
        }
        return nuevoEstado;
    };
    return Celula;
}());
exports.Celula = Celula;
//# sourceMappingURL=Celula.js.map