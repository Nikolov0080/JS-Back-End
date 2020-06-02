'use strict'
const schemas = require('../data_base/schemas');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
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
    a.save();
    res.redirect('/');
}

exports.All = (req, res) => {

    Model.find().then(cubes => {
        const newCubes = cubes.slice()
        res.render('index', { newCubes });
    });
}

exports.details = (req, res) => {

    Model.findOne(req.params._id).then(currentCube => {
        res.render('details', { currentCube });
    });
}

exports.deleteItem = (req, res) => {
    const doc_ID = req.params;

    Model.deleteOne(doc_ID, (err) => {
        if (err) { console.error(err) }
    }).then((response) => {
        console.log(response);
    })

    res.redirect('/')
}