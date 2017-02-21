
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";


@inject(Router)
export class App {
    router: Router;

    public items = [
        { value: "male", name: "Male" },
        { value: "female", name: "Female" },
    ];

    protected gender : string = "female";
    protected customGender : string;

    protected addGender() {
        if (this.customGender) {
            this.items.push({ value: this.customGender.toLowerCase(), name: this.customGender });
            this.customGender = null;
        }
    }
    
    configureRouter(config: any, router: Router) {
        this.router = router;

        config.title = "AureliaTSapp";
        config.map([
            { route: ["", "todos"], moduleId: "./views/values", nav: true, title: "Values" },

        ]);
    }
    
}