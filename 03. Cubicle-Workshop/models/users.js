const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 2 },
    password: { type: String, required: true, minlength: 6 },
});

exports.User = mongoose.model('Users', userSchema);