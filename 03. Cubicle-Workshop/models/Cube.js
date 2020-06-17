const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: { type: String, required: true,match: /^[A-z\d]+$/, minlength: 5 },
    description: { type: String, required: true , minlength: 20, match: /^[A-z\d ]+$/},
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    accessories: [{ type: 'ObjectId', ref: 'Accessory' }],
    creatorId: { type: 'ObjectId', ref: 'User' }
});

cubeSchema.path("imageUrl").validate(function (url) {
    return url.includes('http') || url.includes('https');
}, "image Url not valid! not valid");

exports.cubeModel = mongoose.model('Cube', cubeSchema);