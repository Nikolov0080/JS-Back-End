'use strict'
const Cube = require('../models/Cube').cubeModel;
const Accessory = require('../models/Accessory').Accessory;
const mongoose = require('mongoose');
const { getCube, getCubeWithAccessories } = require('./CRUD_Funcs');
mongoose.connect('mongodb://localhost:27017/cubes', { useNewUrlParser: true, useUnifiedTopology: true });


exports.about = (req, res) => {
    res.render('about');
}

exports.create = ((req, res) => {
    res.render('create');
});

exports.createCube = (req, res) => {

    const cubeData = { ...req.body }
    const a = Cube(cubeData);
    console.log('cube created !');
    a.save((err) => {
        if (err) {
            console.error(err.message);
            res.redirect('/create/cube');
        } else { res.redirect('/'); }
    });
}

exports.All = (req, res) => {

    Cube.find().lean().then(newCubes => {
        res.render('index', { newCubes });
    });
}

exports.details = (req, res) => {
    const id = { _id: req.params.id }
    const cube = getCube(id);
    getCubeWithAccessories(id).then(([currentCube]) => {
        res.render('updatedDetailsPage', { currentCube });
    });
}


exports.notFound = (req, res) => {
    res.render('404')
}