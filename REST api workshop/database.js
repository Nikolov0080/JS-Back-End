const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log('DB Connected!'));
    // const Cat = mongoose.model('Cat', { name: String });

    // const kitty = new Cat({ name: 'Zildjian' });
    // kitty.save().then(() => console.log('meow'));

}

module.exports = {
    connectDB
}