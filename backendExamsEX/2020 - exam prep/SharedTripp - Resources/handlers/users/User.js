const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    // special for the  TASK!!!
    trippHistory: [{
        type: ObjectId,
        ref: 'Tripp'
    }]
});

module.exports = new Model('User', userSchema);