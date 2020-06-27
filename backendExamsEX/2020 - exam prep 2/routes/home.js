const router = require('express').Router();
const handlers = require('../handlers/home/home');
const isAuth = require('../utils/isAuth');

// isAuth(true) === skip authentication;
router.get('/', isAuth(true), handlers.get.home);

module.exports = router;