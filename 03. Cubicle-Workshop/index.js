const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();

// db
const mongoose = require('mongoose');

mongoose.connect(config.databaseUrl, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) { console.error(err); throw err }
    console.log('Cloud DB connected!');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// /db

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
