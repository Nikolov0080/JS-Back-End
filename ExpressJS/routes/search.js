const { route } = require('./home-page');

const router = require('express').Router();

router.use((req, res,next) => {
    console.log('Search is On');
    next()
})

router.get('/search/:keyword', (req, res) => {
    const keyword = req.params.keyword
    res.send(`keyword: ${keyword}`)
})

module.exports = router;
