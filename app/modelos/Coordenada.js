System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Coordenada;
    return {
        setters:[],
        execute: function() {
            Coordenada = (function () {
                function Coordenada(x, y) {
                    if (x === void 0) { x = 1; }
                    if (y === void 0) { y = -1; }
                    this.x = x;
                    this.y = y;
                    this.x = x;
                    this.y = y;
                }
                Coordenada.prototype.esIgual = function (otra) {
                    if (!otra) {
                        return false;
                    }
                    if (otra.x !== this.x) {
                        return false;
                    }
                    return otra.y === this.y;
                };
                return Coordenada;
            }());
            exports_1("Coordenada", Coordenada);
        }
    }
});
//# sourceMappingURL=Coordenada.js.map