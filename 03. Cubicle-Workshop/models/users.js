const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, required: true, minlength: 5,
        unique: true,
        required: true
    },
    password: {
        type: String, required: true, minlength: 8,
        required: true
    },
});



exports.User = mongoose.model('Users', userSchema);