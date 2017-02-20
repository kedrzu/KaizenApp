import { FrameworkConfiguration } from "aurelia-framework";

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        "./form",
        "./field",
        "./textbox",
        "./combobox"
    ]);
}    