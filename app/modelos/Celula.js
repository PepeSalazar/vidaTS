System.register(["./Coordenada", "./EstadoCelula"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Coordenada_1, EstadoCelula_1;
    var Celula;
    return {
        setters:[
            function (Coordenada_1_1) {
                Coordenada_1 = Coordenada_1_1;
            },
            function (EstadoCelula_1_1) {
                EstadoCelula_1 = EstadoCelula_1_1;
            }],
        execute: function() {
            Celula = (function () {
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
                Celula.prototype.esIgual = function (otra) {
                    if (!otra) {
                        return false;
                    }
                    return otra.getCoordenada().esIgual(this.getCoordenada());
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
            exports_1("Celula", Celula);
        }
    }
});
//# sourceMappingURL=Celula.js.map