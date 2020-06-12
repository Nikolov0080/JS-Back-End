const User = require('../models/users').User;
const Cube = require('../models/Cube').cubeModel;
const Accessory = require('../models/Accessory').Accessory;
const mongoose = require('mongoose');
const { getCube, getCubeWithAccessories } = require('../controllers/CRUD_Funcs');
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

exports.loginGET = (req, res) => {
    res.render('loginPage');
}

exports.registerGET = (req, res) => {
    res.render('registerPage');
}

exports.registerPOST = async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (password === repeatPassword) {
        const hash = hashFunc.createHash(password);
        const user = new User({ username, password: hash });
        user.save().then(() => {
            console.log(`User ${username} created successful!`)
        }).catch(err => {
            console.error(err)
        })
        res.redirect('/');
    } else {
        res.render('404');
    }
}

exports.loginPOST = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).lean().then((userData) => {
        const isLogged = hashFunc.readHash(password, userData.password);
        if (isLogged) {

            res.redirect('/login');
        } else {
             res.redirect('404');
        }
    });

}

exports.logout = (req, res) => { // TODO
    res.redirect('/');
}
