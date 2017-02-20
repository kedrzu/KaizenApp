var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable } from "aurelia-framework";
import { bindingMode } from "aurelia-framework";
import { customElement } from "aurelia-framework";
let Combobox = class Combobox {
    attached() {
        var combo = $(this.combo);
        combo.dropdown();
    }
};
__decorate([
    bindable
], Combobox.prototype, "items", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay })
], Combobox.prototype, "value", void 0);
Combobox = __decorate([
    customElement('ui:combobox')
], Combobox);
export { Combobox };
