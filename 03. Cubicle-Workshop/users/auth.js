const User = require('../models/users').User;

const { saveUser, loginUser, isLogged } = require('../controllers/user');

exports.loginGET = (req, res) => {
    res.render('loginPage');
}

exports.registerGET = (req, res) => {

    const error = req.url === '/register?error=true' ? 'Username of Password invalid !' : null
    res.render('registerPage', {
        error
    });
}

exports.registerPOST = async (req, res) => {
    const status = await saveUser(req, res);
  
    if (!status) {
        return res.redirect('/register?error=true');
    } else {
        res.redirect('/');
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
