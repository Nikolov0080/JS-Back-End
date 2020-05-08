var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const landing = require('../controllers/landing');

router.use(bodyParser.json())
.use(bodyParser.urlencoded({
    extended: true
}));

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/all', landing.getAll);


module.exports = router;
