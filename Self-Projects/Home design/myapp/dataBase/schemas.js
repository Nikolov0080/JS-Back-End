
const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    name: String,
    imageUrl: String,
    designStyle: String,
    description: String
});

exports.Design = mongoose.model('designs', schema);
