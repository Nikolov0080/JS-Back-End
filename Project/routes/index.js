var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'apofis12343@gmail.com',
        pass: '********'
    }
});
const admin = require("firebase-admin");
admin.initializeApp();

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
