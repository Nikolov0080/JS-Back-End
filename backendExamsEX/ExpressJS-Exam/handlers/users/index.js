const User = require('./User');
const jwt = require('../../utils/jwt');
const { cookie } = require('../../config/config');
const validatorResults = require('express-validator').validationResult

module.exports = {
    get: {
        login(req, res, next) {
            res.render('login');
        }
        ,
        register(req, res, next) {
            res.render('register');
        },
        logout(req, res, next) {
            req.user = undefined;
            res.clearCookie('x-auth-token').redirect('/home/');
        }
    },
    post: {
        login(req, res, next) {

            const errors = validatorResults(req)

            const { username, password } = req.body;

            if (errors.isEmpty()) {

                User.findOne({ username }).then((user) => {
                    return Promise.all([user.passwordsMatch(password), user]);
                }).then(([match, user]) => {
                    if (!match) { next(err); return; }

                    const token = jwt.createToken(user);
                    res.status(201).cookie(cookie, token).redirect('/home/');

                }).catch((e) => { console.log(e); });
            } else {
                res.render('login', { message: errors.errors[0].msg });
            }


        },
        register(req, res, next) {

            const { username, password, rePassword } = req.body;
            const errors = validatorResults(req);

            if(password !== rePassword){
                return  res.render('register', { message: 'Passwords do not match' })
            }
        
            if (errors.isEmpty()) {
                User.create({ username, password })// Creating the user (Register)
                    .then(console.log(username + " Is Created !!"))
                    .catch((e) => console.error(e));

                return res.redirect('/users/login');
            }
            console.log(errors)

            res.render('register', { message: errors.errors[0].msg })
        }
    }
}