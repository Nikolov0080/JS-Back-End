const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: String
});

exports.cubeModel = mongoose.model('Cube', cubeSchema);