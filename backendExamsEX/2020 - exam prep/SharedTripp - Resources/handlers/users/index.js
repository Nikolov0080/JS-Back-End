const User = require('./User');
const jwt = require('../../utils/jwt');
const { cookie } = require('../../config/config');
const bcrypt = require('bcrypt');


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
            console.log(req.body)

            res.redirect('/home/');

        },
        register(req, res, next) {


            console.log(req.body)

            res.redirect('/home/');
        }
    }
}