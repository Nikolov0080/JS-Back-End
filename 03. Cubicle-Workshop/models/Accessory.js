const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cubes: [{ type: 'ObjectId', ref: 'Cube' }]
});

accessorySchema.path("imageUrl").validate(function (url) {
    return url.includes('http') || url.includes('https');
},"image Url not valid! not valid");

exports.Accessory = mongoose.model('Accessory', accessorySchema);
