const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    accessories: [{ type: 'ObjectId', ref: 'Accessory' }]
});

cubeSchema.path("imageUrl").validate(function (url) {
    return url.includes('http') || url.includes('https');
},"image Url not valid! not valid");

exports.cubeModel = mongoose.model('Cube', cubeSchema);