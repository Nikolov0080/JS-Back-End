const router = require('express').Router();
const handlers = require('../handlers/users');
const isAuth = require('../utils/isAuth');

// TODO !

router.get('/login',isAuth(true), handlers.get.login);
router.get('/register',isAuth(true), handlers.get.register);
router.get('/logout',handlers.get.logout)
router.post('/login', handlers.post.login);
router.post('/register', handlers.post.register);

module.exports = router;