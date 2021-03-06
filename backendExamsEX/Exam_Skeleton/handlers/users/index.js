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
        }
    },
    post: {
        login(req, res, next) {

            const { email, password } = req.body;
            User.findOne({ email }).then((user) => {
                return Promise.all([user.passwordsMatch(password), user]);
            }).then(([match, user]) => {
                if (!match) { next(err); return; } // TODO add wRONG PASSWORD NOTIFICATION

                const token = jwt.createToken(user);
                res.status(201).cookie(cookie, token).redirect('/users/login');

            });

       
        },
        register(req, res, next) {

            const { email, password, rePassword } = req.body;

            if (password === rePassword) {

                User.create({ email, password })// Creating the user (Register)
                    .then(console.log(email + " Is Created !!"))
                    .catch((e) => console.error(e));

            } else {
                return res.redirect('/users/register')
            }

            res.redirect('/users/login');
        }
    }
}