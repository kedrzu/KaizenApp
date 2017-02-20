
import { bindable } from 'aurelia-framework';
import { bindingMode } from 'aurelia-framework';
import { customElement } from "aurelia-framework";

@customElement('ui:textbox')
export class Textbox {
            
    @bindable
    public placeholder : string;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    public value: string;    
} 