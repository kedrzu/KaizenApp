import { greet } from "./greeter";
import * as $ from 'jquery';

export class App {

    public message : string;

    constructor() {
        this.message = greet("Michał");
    }
}