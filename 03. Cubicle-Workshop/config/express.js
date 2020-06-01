const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('../node_modules/@handlebars/allow-prototype-access');

module.exports = (app) => {

    //TODO: Setup the view engine//

    app.engine('hbs', handlebars({
        
        // ...implement newly added insecure prototype access
        handlebars: allowInsecurePrototypeAccess(Handlebars)
        })
    );
    // app.engine('.hbs', handlebars({ extname: '.hbs', handlebars: allowInsecurePrototypeAccess(handlebars) }));
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser//
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //TODO: Setup the static files//
    app.use(express.static('static'));


};
