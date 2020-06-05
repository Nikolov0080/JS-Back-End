
const schemas = require('../models/Cube');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/cubes', { useNewUrlParser: true, useUnifiedTopology: true });
const Model = schemas.cubeModel;


exports.createAccessory = (req, res) => {
    res.render('createAccessory');
}

exports.create = (req, res) => {

}

exports.attachAccessory = (req, res) => {
    res.render('attachAccessory');
}
