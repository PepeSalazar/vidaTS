System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Lib;
    return {
        setters:[],
        execute: function() {
            Lib = (function () {
                function Lib() {
                }
                Lib.asyncMe = function (miFuncion, contexto) {
                    setTimeout(miFuncion.bind(contexto), 0);
                };
                return Lib;
            }());
            exports_1("Lib", Lib);
        }
    }
});
//# sourceMappingURL=lib.js.map