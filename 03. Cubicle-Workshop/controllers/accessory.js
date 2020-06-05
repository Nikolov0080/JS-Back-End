const schemas = require('../models/Cube');
const Accessory = require('../models/Accessory').Accessory;
const mongoose = require('mongoose');
const Model = schemas.cubeModel;
mongoose.connect('mongodb://localhost:27017/cubes', { useNewUrlParser: true, useUnifiedTopology: true });


exports.createAccessory = (req, res) => {
    res.render('createAccessory');
}

exports.createNewAccessory = async (req, res) => {

    const { name, description, imageUrl } = req.body;
    const accessory = new Accessory({ name, description, imageUrl });

    await accessory.save();

    res.redirect('/create/accessory')
}

exports.attachAccessory = (req, res) => {

    const id = { _id: req.params.id }

    Model.find(id).then(currentCube => {
        currentCube = currentCube[0];
        res.render('attachAccessory', { currentCube });
    });

}
