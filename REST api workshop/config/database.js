const mongoose = require('mongoose');
const {url} = require('./config').config

const connectDB = () => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log('DB Connected!'));
    // const Cat = mongoose.model('Cat', { name: String });
    // const kitty = new Cat({ name: 'Zildjian' });
    // kitty.save().then(() => console.log('meow'));
}

module.exports = {
    connectDB
}