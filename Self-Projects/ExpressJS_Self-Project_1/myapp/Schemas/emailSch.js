const mongoose = require('mongoose');

exports.emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    todayNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});