import { Aurelia } from 'aurelia-framework';
import { bootstrap } from 'aurelia-bootstrapper-webpack';
import "jquery";
import "moment";

bootstrap((aurelia) => {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature("ui")
        .feature("app");
    
    aurelia.start().then(a => {
        a.setRoot("app", document.body);
    });
});  