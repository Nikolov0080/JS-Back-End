const router = require('express').Router();

router.get('/search/:keyword', (req, res) => {
    const keyword = req.params.keyword
    res.send(`keyword: ${keyword}`)
})

module.exports = router;
