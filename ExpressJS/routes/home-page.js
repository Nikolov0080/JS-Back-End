const router = require('express').Router();

const homePageContext = {
   context:'hohohoho',
   title:'Title'
}


router.get('/',  (req, res, next) => {
    res.status(200).render('home',homePageContext);

})

router.post('/', (req, res) => {
    res.send('post request');
})

module.exports = router;