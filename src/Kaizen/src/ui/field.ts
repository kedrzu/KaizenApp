
import { bindable } from "aurelia-framework";
import { bindingMode } from "aurelia-framework";
import { customElement } from "aurelia-framework";

@customElement('ui:field')
export class Field {

    @bindable
    public label: string;
        
    @bindable({ defaultBindingMode: bindingMode.twoWay })
    public value: string;    
}