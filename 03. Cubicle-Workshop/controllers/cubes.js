'use strict'
const schemas = require('../models/Cube');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cubes', { useNewUrlParser: true, useUnifiedTopology: true });
const Model = schemas.cubeModel;

exports.about = (req, res) => {
    res.render('about');
}

exports.create = ((req, res) => {
    res.render('create');
});

exports.createCube = (req, res) => {

    const cubeData = { ...req.body }
    const a = Model(cubeData);
    console.log('cube created !');
    a.save();
    res.redirect('/');
}

exports.All = (req, res) => {

    Model.find().lean().then(newCubes => {
        res.render('index', { newCubes });
    });
}

exports.details = (req, res) => {

    const id = { _id: req.params.id }

    Model.find(id).then(currentCube => {
        currentCube = currentCube[0];
        res.render('updatedDetailsPage', { currentCube });
    });
}


exports.notFound = (req, res) => {
    res.render('404')
}