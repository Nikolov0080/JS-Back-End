const mongoose = require('mongoose');
const dbString = require('./config').dbUrl + 'TEST_EXAM-PREP'// TODO [!];
const readyString = `${'*'.repeat(10)} Database is Ready ${'*'.repeat(10)}`;

module.exports = () => {
    return mongoose.connect(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
        console.log(readyString)
    );
}