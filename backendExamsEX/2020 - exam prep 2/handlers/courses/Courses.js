const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;
const { String, ObjectId } = Schema.Types;

const coursesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,

    },
    description: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    usersEnrolled: [{
        type: ObjectId,
        ref: 'User'
    }],
    creator: {
        type: String,
        required: true
    }
});

module.exports = new Model('Courses', coursesSchema);