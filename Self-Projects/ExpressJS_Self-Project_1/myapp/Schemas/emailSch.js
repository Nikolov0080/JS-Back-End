const mongoose = require('mongoose');



exports.emailSchema = new mongoose.Schema({
    email: String,
    todayNumber: Number,
    password: String,
    username: String
});