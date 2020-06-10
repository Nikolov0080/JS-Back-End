
const Cube = require('../models/Cube').cubeModel;
const Accessory = require('../models/Accessory').Accessory;
const mongoose = require('mongoose');
const { getCube, getCubeWithAccessories } = require('../controllers/CRUD_Funcs');

exports.loginGET = (req, res) => {// TODO
    res.render('loginPage');
}

exports.registerGET = (req, res) => {// TODO
    res.render('registerPage');
}

exports.logout = (req, res) => { // TODO
    res.redirect('/');
}
