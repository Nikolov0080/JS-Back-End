const router = require('express').Router();
const handlers = require('../handlers/theatre');
const isAuth = require('../utils/isAuth');
const { validateCreate } = require('../utils/validator')

router.get('/create', isAuth(), handlers.get.create);
router.get('/details/:_id', isAuth(), handlers.get.details);
router.get('/like/:_Id', isAuth(), handlers.get.like);
router.get('/edit/:_Id', isAuth(), handlers.get.edit);
router.get('/delete/:_id', isAuth(), handlers.get.delete);



router.post('/create', validateCreate, isAuth(), handlers.post.create);
router.post('/edit/:_Id', isAuth(), handlers.post.edit);


module.exports = router;
