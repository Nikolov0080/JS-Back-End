const mongoose = require('mongoose');

exports.emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});