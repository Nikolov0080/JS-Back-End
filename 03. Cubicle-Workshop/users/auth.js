const User = require('../models/users').User;

const { saveUser, loginUser,checkAuth } = require('../controllers/user');


exports.loginGET = (req, res) => {
    res.render('loginPage');
}

exports.registerGET = (req, res) => {
    res.render('registerPage');
}

exports.registerPOST = async (req, res) => {
    const status = await saveUser(req, res);

    if (status) {
        res.redirect('/');
    } else {
        res.render('404');
    }
}

exports.loginPOST = async  (req, res) => {
    const status = await loginUser(req, res);

    if (!status) {
        res.redirect('/');
    } else {
        res.render('404');
    }
}

exports.logout = (req, res) => { // TODO
    res.redirect('/');
}
