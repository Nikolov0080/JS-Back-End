const router = require('express').Router();
const handlers = require('../handlers/users');
const isAuth = require('../utils/isAuth');
const { validatorResults } = require('express-validator');
const { register ,login } = require('../utils/validator');

// TODO !

router.get('/login', handlers.get.login);
router.get('/register',  isAuth(true), handlers.get.register);
router.get('/logout', isAuth(), handlers.get.logout)

router.post('/login',login, handlers.post.login);
router.post('/register',register, handlers.post.register);

module.exports = router;