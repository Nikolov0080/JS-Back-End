const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('../node_modules/@handlebars/allow-prototype-access');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

    app.engine('hbs', handlebars({
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));

    app.set('view engine', '.hbs');
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('static'));
};
