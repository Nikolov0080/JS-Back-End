var express = require('express');
var router = express.Router();
const landing = require('../controllers/landing');

/* GET home page. */
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/allUsers', landing.getAll);
module.exports = router;
