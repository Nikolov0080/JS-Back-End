const emailSchema = require('../Schemas/emailSch').emailSchema;


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Email_DB', {
    useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Connected!');

});

exports.emailModel = db.model('Email', emailSchema);

exports.getAllUsers = db.collection('emails');
