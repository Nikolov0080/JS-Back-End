
const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const schema = new Schema({
    name: String,
    ImageUrl: String,
    designStyle: String,
    description: String
});

exports.Design = mongoose.model('designs', schema);
