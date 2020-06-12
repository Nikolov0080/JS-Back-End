const User = require('../models/users').User;
const Cube = require('../models/Cube').cubeModel;
const Accessory = require('../models/Accessory').Accessory;
const mongoose = require('mongoose');
const { getCube, getCubeWithAccessories } = require('../controllers/CRUD_Funcs');

exports.loginGET = (req, res) => {
    res.render('loginPage');
}

exports.registerGET = (req, res) => {
    res.render('registerPage');
}

exports.registerPOST =  async(req, res) => {
    const { username, password, repeatPassword } = req.body;

if(password === repeatPassword){
    const user = new User({ username, password });
    user.save().then(x=>{
        console.log(`User ${username} created successful!`)
    });
    res.redirect('/');
}else{
    res.render('404');
}


}

exports.loginPOST = (req, res) => {
    const { username, password } = req.body;

}

exports.logout = (req, res) => { // TODO
    res.redirect('/');
}
