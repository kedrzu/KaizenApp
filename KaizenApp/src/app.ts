import * as core from "app/core";

export class App {

    public message : string;

    constructor() {
        this.message = core.greet("Michał");
    }
}