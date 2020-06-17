const { privateKey } = require('./JWT_P_Key');
const { User } = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cube = require('../models/Cube').cubeModel;

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

exports.saveUser = async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if ((password === repeatPassword) && (username.match(/^[A-z\d]+$/)) && (password.match(/^[A-z\d]+$/))) {

        const hash = hashFunc.createHash(password);

        const user = await new User({ username, password: hash });
        const userData = user.save();

        if (userData) {
            res.cookie('aid', tokenFunc(userData._id, username, privateKey));
            console.log(`User ${username} created successful and logged in!`);
        } else {
            return false
        }

        return true;
    }

}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username })
    if (currentUser) {
        const isLogged = hashFunc.readHash(password, currentUser.password);
        if (isLogged) {
            res.cookie('aid', tokenFunc(currentUser._id, username, privateKey));
            console.log(`${username} is now logged in!`);
        }
    }

    return false;
}

exports.auth = (req, res, next) => {
    const token = req.cookies['aid'];
    if (token) {
        next();
    } else {
        res.redirect('/');
    }
}

exports.isLogged = (req, res, next) => {
    const token = req.cookies['aid'];
    if (token) {
        res.redirect('/');
    } else {
        next();
    }
}

exports.isCreator = async (req, res, next) => {
    const token = req.cookies['aid']; // get the token

    if (token) {
        const { userID } = await jwt.verify(token, privateKey)// get the ID from the token
        const cubeID = { _id: req.params.id };
        const creatorID = (await Cube.findOne(cubeID)).creatorId;
        if (creatorID == userID) {
            next();
        } else {
            return res.render('404');
        }
    } else {
        return res.render('404');
    }
}