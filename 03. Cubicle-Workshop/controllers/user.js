const {privateKey} = require('./JWT_P_Key');
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const hashFunc = {
    createHash: (password) => { return bcrypt.hashSync(password, 10) },
    readHash: (password, hash) => {
        if (bcrypt.compareSync(password, hash)) {
            return true;
        } else {
            return false;
        }
    }
}

const tokenFunc = (userID, username, privateKey) => {
    const token = jwt.sign({ userID, username }, privateKey);
    return token;
}

exports.saveUser = (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (password === repeatPassword) {
        const hash = hashFunc.createHash(password);
        const user = new User({ username, password: hash });
        const userData = user.save();
        res.cookie('aid', tokenFunc(userData._id, username, privateKey));
        console.log(`User ${username} created successful and logged in!`);
    }

    return true;
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username })
    const isLogged = hashFunc.readHash(password, currentUser.password);

    if (isLogged) {
        res.cookie('aid', tokenFunc(currentUser._id, username, privateKey));
        console.log(`${username} is now logged in!`);
    }
    
    return false;
}