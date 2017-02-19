import { greet } from "./greeter";
export class App {
    constructor() {
        this.message = greet("Michał");
    }
}
