const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;


const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    seats: {
        type: Number || String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    driver: {
        type: String
    },
    buddies: [{
        type: 'ObjectId',
        ref: 'User'
    }]
});

module.exports = new Model('Trip', tripSchema);
