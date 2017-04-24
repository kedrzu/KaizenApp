import { Aurelia } from 'aurelia-framework';
import { bootstrap } from 'aurelia-bootstrapper-webpack'; 

bootstrap((aurelia : Aurelia) => {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start().then(a => {
        //this loads our app.js in the body element.
        a.setRoot('app', document.body);
    }); 
}); 