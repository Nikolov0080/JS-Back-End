const router = require('express').Router();

const getNumbers = (req, res, next) => {
    req.numbers = '0010011'; // data from here
    next()
}

router.get('/', getNumbers, (req, res, next) => {
    res.status(200).send(`the data: ${req.numbers}`); // goes here
})

router.post('/', (req, res) => {
    res.send('post request')
})

module.exports = router;