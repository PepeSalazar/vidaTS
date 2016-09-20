System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ESTADO_CELULA;
    return {
        setters:[],
        execute: function() {
            (function (ESTADO_CELULA) {
                ESTADO_CELULA[ESTADO_CELULA["MUERTA"] = 0] = "MUERTA";
                ESTADO_CELULA[ESTADO_CELULA["VIVA"] = 1] = "VIVA";
            })(ESTADO_CELULA || (ESTADO_CELULA = {}));
            exports_1("ESTADO_CELULA", ESTADO_CELULA);
        }
    }
});
//# sourceMappingURL=EstadoCelula.js.map