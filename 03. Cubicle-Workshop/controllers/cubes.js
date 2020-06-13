// const Accessory = require('../models/Accessory').Accessory;
const { privateKey } = require('./JWT_P_Key');
const Cube = require('../models/Cube').cubeModel;
const { getCube, getCubeWithAccessories } = require('./CRUD_Funcs');
const { checkAuth } = require('../controllers/user');
const jwt = require('jsonwebtoken');

exports.about = (req, res) => {
    res.render('about');
}

exports.create = (req, res, checkAuth) => {
    res.render('create');
}

exports.createCube = checkAuth, async (req, res) => {

    const token = req.cookies['aid'];
    const decodedData = await jwt.verify(token, privateKey)
    const cubeData = { ...req.body, creatorId: decodedData.userID }
    const a = Cube(cubeData);

    a.save((err) => {
        if (err) {
            console.error(err.message);
            res.redirect('/create/cube');
        } else {
            console.log('cube created !');
            res.redirect('/');
        }
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


exports.editGET = (req, res) => {// TODO
    res.render('editCubePage');
}

exports.deleteGET = (req, res) => {// TODO
    res.render('deleteCubePage');
}

exports.notFound = (req, res) => {
    res.render('404')
}