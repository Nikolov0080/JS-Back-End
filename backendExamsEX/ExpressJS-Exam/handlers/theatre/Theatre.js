const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const theatreSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean || String, // no time to fix :/
        default: false
    },
    createdAt: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true
    },
    usersLiked: [{
        type: ObjectId,
        ref: 'User'
    }]

});

module.exports = new Model('Theatre', theatreSchema);
