System.register(["@angular/core", "../modelos/Mapa", "../modelos/EstadoCelula"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Mapa_1, EstadoCelula_1;
    var UniversoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Mapa_1_1) {
                Mapa_1 = Mapa_1_1;
            },
            function (EstadoCelula_1_1) {
                EstadoCelula_1 = EstadoCelula_1_1;
            }],
        execute: function() {
            UniversoComponent = (function () {
                // constructor(private renglones : number, private columnas : number, private tamCelulas : number, private espacioCelular : number, private porcentajeVida : number){
                function UniversoComponent() {
                    this.cantidadGeneraciones = 0;
                    this.cantidadColonias = 0;
                    this.renglones = 200;
                    this.columnas = 200;
                    this.tamCelulas = 4;
                    this.espacioCelular = 0;
                    this.porcentajeVida = 0.4;
                    this.mapa = new Mapa_1.Mapa(this.renglones, this.columnas, this.tamCelulas, this.porcentajeVida);
                    console.log("This mapa is: ", this.renglones, this.columnas);
                }
                UniversoComponent.prototype.ngAfterViewInit = function () {
                    var canvas = this.universo.nativeElement;
                    canvas.width = this.columnas * this.tamCelulas;
                    canvas.height = this.renglones * this.tamCelulas;
                    this.contexto = canvas.getContext("2d");
                    this.generarVida();
                    this.tick();
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
                UniversoComponent.asignarColonia = function (celula, padre) {
                    if (padre) {
                        celula.setColonia(padre.getColonia());
                        return;
                    }
                    var colonia = Math.floor(Math.random() * (255));
                    celula.setColonia(colonia);
                };
                UniversoComponent.prototype.detectarColonia = function (celula, padre) {
                    var self = this;
                    var vecinas;
                    if (celula.getColonia() !== -1) {
                        return;
                    }
                    if (celula.getEstado() === EstadoCelula_1.ESTADO_CELULA.MUERTA) {
                        return;
                    }
                    UniversoComponent.asignarColonia(celula, padre);
                    vecinas = self.mapa.obtenerCelulasVecinas(celula);
                    vecinas.forEach(function (vecina, index, array) {
                        var esValida = Mapa_1.Mapa.esCelulaVecinaValida(vecina, padre);
                        if (esValida) {
                            self.detectarColonia(vecina, celula);
                        }
                    });
                };
                UniversoComponent.generarNumeroRandom = function (min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                UniversoComponent.prototype.pintarCambios = function () {
                    var _this = this;
                    this.mapa.recorrer(function (celula) {
                        _this.pintarCelula(celula);
                    });
                };
                UniversoComponent.prototype.pintarCelula = function (celula) {
                    var x = celula.getCoordenada().x * this.tamCelulas; //Calcula la posición de la célula en el canvas.
                    var y = celula.getCoordenada().y * this.tamCelulas;
                    var celulaWidth = this.tamCelulas - this.espacioCelular;
                    var celulaHeight = this.tamCelulas - this.espacioCelular;
                    this.contexto.fillStyle = this.seleccionarColor(celula);
                    this.contexto.fillRect(x, y, celulaWidth, celulaHeight);
                    // this.contexto.fillStyle = "#000";
                    // this.contexto.font      = "10px Arial";
                    // this.contexto.fillText(celula.getId().toString(), (x + this.tamCelulas / 2), (y + this.tamCelulas / 2));
                };
                UniversoComponent.prototype.seleccionarColor = function (celula) {
                    var estado = celula.getEstado();
                    if (estado === EstadoCelula_1.ESTADO_CELULA.MUERTA) {
                        return "#09C";
                    }
                    if (estado === EstadoCelula_1.ESTADO_CELULA.SELECCIONADA) {
                        return "#FF0";
                    }
                    var cadena = Math.floor(celula.getColonia()).toString(16);
                    cadena = UniversoComponent.formatearCadena(cadena);
                    if (cadena !== "00") {
                        cadena = "#00CC" + cadena;
                    }
                    else {
                        cadena = "#00CCFF";
                    }
                    return cadena;
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
                    this.mapa.recorrer(this.detectarColonia.bind(this));
                    this.generaciones = this.generaciones + 1;
                    this.pintarCambios();
                };
                UniversoComponent.prototype.controlesHandler = function ($event) {
                    var self = this;
                    console.log("Received: ", $event);
                    switch ($event) {
                        case "tick":
                            self.tick();
                            break;
                        case "exterminio":
                            this.exterminarVida();
                            this.generarVida();
                            this.tick();
                            break;
                        default:
                            console.log("No");
                    }
                };
                __decorate([
                    core_1.ViewChild("universo"), 
                    __metadata('design:type', Object)
                ], UniversoComponent.prototype, "universo", void 0);
                UniversoComponent = __decorate([
                    core_1.Component({
                        selector: "universo",
                        templateUrl: "app/universo/universo.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], UniversoComponent);
                return UniversoComponent;
            }());
            exports_1("UniversoComponent", UniversoComponent);
        }
    }
});
//# sourceMappingURL=universo.component.js.map