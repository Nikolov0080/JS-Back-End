const mongoose = require('mongoose');
const config = require('./config');
const dbName = '';

module.exports = () => {
    mongoose.connect(config.dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true },console.log('*** Database Connected ! ***'))
}