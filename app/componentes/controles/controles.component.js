System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var ControlesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ControlesComponent = (function () {
                function ControlesComponent() {
                    this.controlesEvent = new core_1.EventEmitter();
                }
                ControlesComponent.prototype.tick = function () {
                    this.controlesEvent.emit("tick");
                };
                ControlesComponent.prototype.play = function () {
                    var _this = this;
                    window.clearInterval(this.funcionTiempo); //Se detiene cualquier otro ciclo anterior.
                    this.funcionTiempo = window.setInterval(function () {
                        _this.controlesEvent.emit("tick");
                    }, 1); //El tiempo se echa a andar.
                };
                ControlesComponent.prototype.pause = function () {
                    // this.controlesEvent.emit("pause");
                };
                ControlesComponent.prototype.reset = function () {
                    this.controlesEvent.emit("exterminio");
                };
                ControlesComponent.prototype.stop = function () {
                    window.clearInterval(this.funcionTiempo);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ControlesComponent.prototype, "controlesEvent", void 0);
                ControlesComponent = __decorate([
                    core_1.Component({
                        selector: "controles",
                        templateUrl: "app/componentes/controles/controles.component.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ControlesComponent);
                return ControlesComponent;
            }());
            exports_1("ControlesComponent", ControlesComponent);
        }
    }
});
//# sourceMappingURL=controles.component.js.map