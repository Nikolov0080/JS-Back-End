const User = require('../models/users').User;

const { saveUser, loginUser, isLogged } = require('../controllers/user');

exports.loginGET = (req, res) => {
    res.render('loginPage');
}

exports.registerGET = (req, res) => {
    res.render('registerPage');
}

exports.registerPOST = async (req, res) => {
    const status = await saveUser(req, res);
    console.log("sattus " + status);
    
    if (status) {
        res.redirect('/');
    } else {
        res.redirect('/register');
    }
}

exports.loginPOST = async (req, res) => {
    const status = await loginUser(req, res);

    if (status) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}

exports.logout = (req, res) => {
    res.clearCookie('aid').redirect('/');
}
