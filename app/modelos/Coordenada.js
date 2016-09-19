"use strict";
var Coordenada = (function () {
    function Coordenada(x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = -1; }
        this.x = x;
        this.y = y;
        this.x = x;
        this.y = y;
    }
    Coordenada.prototype.isEqual = function (otra) {
        if (!otra) {
            return false;
        }
        if (otra.x !== this.x) {
            return false;
        }
        if (otra.y !== this.y) {
            return false;
        }
        return true;
    };
    return Coordenada;
}());
exports.Coordenada = Coordenada;
//# sourceMappingURL=Coordenada.js.map