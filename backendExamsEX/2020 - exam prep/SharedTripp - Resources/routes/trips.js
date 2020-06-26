const router = require('express').Router();
const handlers = require('../handlers/trips');
const isAuth = require('../utils/isAuth');

router.get('/sharedTrips', isAuth(true), handlers.get.sharedTrips);
router.get('/offerTrip', isAuth(true), handlers.get.offerTrip);
router.get('/tripDetails/:id', isAuth(true), handlers.get.tripDetails)
router.get('/deleteTrip/:id',handlers.get.deleteTrip)

router.post('/offerTrip', isAuth(true), handlers.post.offerTrip);
module.exports = router