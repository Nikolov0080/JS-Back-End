const { route } = require('./home-page');

const router = require('express').Router();

const itemsList = {
    items: [
        'wood',
        'food',
        'stone',
        'gold',
        'swinterling'
    ]
}

router.use((req, res, next) => {
    console.log('Items page is Open');
    next()
})

router.get('/items', (req, res) => {
    res.status(200).render('items', itemsList);
})

module.exports = router;
