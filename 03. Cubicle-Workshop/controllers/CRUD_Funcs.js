const Cube = require('../models/Cube').cubeModel;
const Accessory = require('../models/Accessory').Accessory;
const mongoose = require('mongoose');

exports.getCube = (id) => {
    return Cube.find(id);
}

exports.getAccessories = () => {
    return Accessory.find();
}

exports.updateCube = async (cubeId, accessoryId) => {

    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {

            accessories: [accessoryId]
        }
    })

}