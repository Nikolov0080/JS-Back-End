
const schemas = require('../models/Cube');
const mongoose = require('mongoose');
const Model = schemas.cubeModel;


exports.createAccessory = (req, res) => {
    res.render('createAccessory');
}

exports.create = (req, res) => {
    console.log(req.body);

    res.redirect('/')
}

exports.attachAccessory = (req, res) => {
    res.render('attachAccessory', {
        id: req.params.id
    });
}
