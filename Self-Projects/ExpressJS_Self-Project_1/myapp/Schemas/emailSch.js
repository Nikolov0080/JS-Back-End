const mongoose = require('mongoose');



exports.emailSchema = new mongoose.Schema({
    email: String,
    timeCreated: String,
    password: String,
    username: String
});