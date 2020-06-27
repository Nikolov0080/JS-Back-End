const router = require('express').Router();
const handlers = require('../handlers/courses');
const isAuth = require('../utils/isAuth');


router.get('/create', isAuth(true), handlers.get.create)
router.get('/details/:_id', isAuth(true), handlers.get.details);
router.get('/delete/:_id', isAuth(), handlers.get.delete);
router.get('/edit/:_id', isAuth(), handlers.get.edit);
router.get('/enroll/:_id', isAuth(), handlers.get.enroll)


router.post('/edit/:_id',isAuth(),handlers.post.edit)
router.post('/create', isAuth(), handlers.post.create);


module.exports = router;