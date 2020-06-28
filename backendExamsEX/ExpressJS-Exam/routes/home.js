const router = require('express').Router();
const handlers = require('../handlers/home/home');
const isAuth = require('../utils/isAuth');

// isAuth(true) === skip authentication;
router.get('/', isAuth(true), handlers.get.home);
router.get('/sortByLikes', isAuth(true), handlers.get.sort);
router.get('/sortByDates', isAuth(true), handlers.get.sortDate);



module.exports = router;