const Cube = require('../models/Cube').cubeModel;
const Accessory = require('../models/Accessory').Accessory;

exports.getCube =async (id) => {
    const cube = await Cube.find(id);
    return cube
}

exports.getAccessories = () => {
    return Accessory.find();
}

exports.updateCube = async (cubeId, accessoryId) => {

    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    });
}

exports.getCubeWithAccessories = async(id) => {
    const cube = await Cube.find(id).populate('accessories').lean();
    return cube;
}


