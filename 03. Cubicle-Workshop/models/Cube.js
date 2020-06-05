const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    accessories: [{ type: 'ObjectId', ref: 'Accessory' }]
});

exports.cubeModel = mongoose.model('Cube', cubeSchema);