const express = require('express');
const User = require('../handlers/users/User');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const { cookie } = require('../config/config');
const jwt = require('../utils/jwt');
// const bodyParser = require('body-parser');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: 'base-layout',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));
    
    app.use(express.static('public'));
    app.set('view engine', 'hbs');
    app.use(express.json());
    app.use(cookieParser());
    // app.use(bodyParser.urlencoded({
    //     extended: true
    //  }));
    app.use(express.urlencoded({ extended: true }));
};