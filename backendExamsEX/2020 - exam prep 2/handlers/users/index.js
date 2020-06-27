const User = require('./User');
const jwt = require('../../utils/jwt');
const { cookie } = require('../../config/config');


module.exports = {
    get: {
        login(req, res, next) {

            if (req.user) {
                return res.redirect('/home/')
            }

            if (req.url.includes('error')) {
                return res.render('login', {
                    message: "Wrong Username or Password"

                });
            }

            res.render('login');
        }
        ,
        register(req, res, next) {

            if (req.user) {
                return res.redirect('/home/')
            }
            if (req.url.includes('error')) {
                return res.render('register', { message: 'Something went wrong try again' });

            }
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
                if (user == null) { res.redirect('/users/login?error') }
                return Promise.all([user.passwordsMatch(password), user]);
            }).then(([match, user]) => {
                if (!match) { next(err); return; } // TODO add wRONG PASSWORD NOTIFICATION

                const token = jwt.createToken(user);
                res.status(201).cookie(cookie, token).redirect('/users/login');

            }).catch((err) => {
                console.log(err)
            })


        },
        register(req, res, next) {

            const { username, password, repeatPassword } = req.body;

            if (password === repeatPassword) {

                User.create({ username, password })// Creating the user (Register)
                    .then(console.log(username + " Is Created !!"))
                    .catch((e) => console.error(e));

            } else {
                return res.redirect('/users/register?error')
            }

            res.redirect('/users/login');
        }
    }
}