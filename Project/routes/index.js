var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express', someVariable: 'example' });
});

router.post('/', (req, res, next) => {
    console.log(req.body)



    res.redirect('./')
})

router.get('/about', (req, res) => {

})

module.exports = router;