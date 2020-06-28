const User = require('./User');
const jwt = require('../../utils/jwt');
const { cookie } = require('../../config/config');


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

            const { username, password } = req.body;
            User.findOne({ username }).then((user) => {
                return Promise.all([user.passwordsMatch(password), user]);
            }).then(([match, user]) => {
                if (!match) { next(err); return; } // TODO add wRONG PASSWORD NOTIFICATION

                const token = jwt.createToken(user);
                res.status(201).cookie(cookie, token).redirect('/home/');

            }).catch((e) => {
                res.render('login',{message:"wrong username or password"})
            })


        },
        register(req, res, next) {

            const { username, password, rePassword } = req.body;

            if (password === rePassword) {

                User.create({ username, password })// Creating the user (Register)
                    .then(console.log(username + " Is Created !!"))
                    .catch((e) => console.error(e));

            } else {
                return res.render('register',{message:'something went wrong...'})
            }

            res.redirect('/users/login');
        }
    }
}