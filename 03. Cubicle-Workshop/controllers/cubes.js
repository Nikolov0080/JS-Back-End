const { privateKey } = require('./JWT_P_Key');
const Cube = require('../models/Cube').cubeModel;
const { getCube, getCubeWithAccessories } = require('./CRUD_Funcs');

const jwt = require('jsonwebtoken');

exports.about = (req, res) => {
    res.render('about');
}

exports.create =  (req, res,) => {

    res.render('create');
}

exports.createCube = async (req, res) => {

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

exports.All = async (req, res) => {

    Cube.find().lean().then(cube => {
        let newCubes = { ...cube };
        res.render('index', { newCubes });

    });

}
exports.details = async (req, res) => {
    const id = { _id: req.params.id }
    const cube = getCube(id);
    const token = req.cookies['aid']; // get the token
    if (token) {
        const { userID } = await jwt.verify(token, privateKey)// get the data from the token

        getCubeWithAccessories(id).then(([cube]) => {
            const isCreator = (userID == cube.creatorId)
            currentCube = { ...cube, isCreator };
            res.render('updatedDetailsPage', { currentCube });
        });
    } else {
        res.redirect('/')
    }

}


exports.editGET = async (req, res,) => {
    const cube = await Cube.findOne({ _id: req.params.id })
    res.render('editCubePage', { cube });
}

exports.deleteGET = async (req, res,) => {
    const cube = await Cube.findOne({ _id: req.params.id })
    res.render('deleteCubePage', { cube });
}

exports.deletePOST = async (req, res,) => {

    await Cube.deleteOne({ _id: req.params.id });
    console.log('Cube deleted successfully!');
    res.redirect('/')
}

exports.editPOST = async (req, res,) => {

    let cubeToUpdate = await Cube.findOne({ _id: req.params.id })
    let updateData = req.body;

    const updated = Object.assign(cubeToUpdate, updateData)


    await Cube.updateOne({ _id: req.params.id }, updated, (err, raw) => {
        if (err) { console.error(err) }
        console.log('Cube updated !')
    });

    res.redirect(`/`)
}

exports.notFound = (req, res) => {
    res.render('404')
}