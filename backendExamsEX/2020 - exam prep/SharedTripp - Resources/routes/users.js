const router = require('express').Router();
const handlers = require('../handlers/users');
const isAuth = require('../utils/isAuth');

// TODO !

router.get('/login', handlers.get.login);
router.get('/register', handlers.get.register);
router.get('/logout', isAuth(), handlers.get.logout)

router.post('/login', handlers.post.login);
router.post('/register', handlers.post.register);
module.exports = router;