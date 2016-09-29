System.register(["./Celula", "./Coordenada", "./EstadoCelula"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Celula_1, Coordenada_1, EstadoCelula_1;
    var Mapa;
    return {
        setters:[
            function (Celula_1_1) {
                Celula_1 = Celula_1_1;
            },
            function (Coordenada_1_1) {
                Coordenada_1 = Coordenada_1_1;
            },
            function (EstadoCelula_1_1) {
                EstadoCelula_1 = EstadoCelula_1_1;
            }],
        execute: function() {
            Mapa = (function () {
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
                Mapa.prototype.enElMapa = function (x, y) {
                    return !!(x >= 0 && y >= 0 && x < this.renglones && y < this.columnas);
                };
                Mapa.prototype.getCelula = function (x, y) {
                    var celula;
                    var existe = this.enElMapa(x, y);
                    if (existe) {
                        celula = this.celulas[x][y];
                    }
                    else {
                        celula = new Celula_1.Celula();
                    }
                    return celula;
                };
                Mapa.prototype.recorrer = function (funcion) {
                    for (var i = 0; i < this.renglones; i++) {
                        for (var j = 0; j < this.columnas; j++) {
                            funcion(this.celulas[i][j]);
                        }
                    }
                };
                //Si es célula vecina válida y viva, y no su padre.
                Mapa.esCelulaVecinaValida = function (celula, padre) {
                    return (celula.getId() !== -1 && celula.getEstado() === EstadoCelula_1.ESTADO_CELULA.VIVA && !celula.esIgual(padre));
                };
                Mapa.prototype.obtenerCelulasVecinas = function (celula) {
                    var vecinos = [];
                    var coordenada = celula.getCoordenada();
                    vecinos.push(this.getCelula(coordenada.x - 1, coordenada.y - 1));
                    vecinos.push(this.getCelula(coordenada.x - 1, coordenada.y));
                    vecinos.push(this.getCelula(coordenada.x - 1, coordenada.y + 1));
                    vecinos.push(this.getCelula(coordenada.x, coordenada.y - 1));
                    vecinos.push(this.getCelula(coordenada.x, coordenada.y + 1));
                    vecinos.push(this.getCelula(coordenada.x + 1, coordenada.y - 1));
                    vecinos.push(this.getCelula(coordenada.x + 1, coordenada.y));
                    vecinos.push(this.getCelula(coordenada.x + 1, coordenada.y + 1));
                    return vecinos;
                };
                Mapa.prototype.ContarVecinosVivos = function (celula) {
                    var contadorVecinos = 0;
                    var vecinos = this.obtenerCelulasVecinas(celula);
                    vecinos.forEach(function (vecino) {
                        if (vecino.getId() !== -1 && vecino.getEstado() === EstadoCelula_1.ESTADO_CELULA.VIVA) {
                            contadorVecinos++;
                        }
                    });
                    return contadorVecinos;
                };
                return Mapa;
            }());
            exports_1("Mapa", Mapa);
        }
    }
});
//# sourceMappingURL=Mapa.js.map