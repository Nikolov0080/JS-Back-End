const router = require('express').Router();
const handlers = require('../handlers/trips');
const isAuth = require('../utils/isAuth');

router.get('/sharedTrips', isAuth(true), handlers.get.sharedTrips);
router.get('/offerTrip', isAuth(true), handlers.get.offerTrip);
router.get('/tripDetails/:id', isAuth(true), handlers.get.tripDetails)
router.get('/deleteTrip/:id', isAuth(true), handlers.get.deleteTrip)
router.get('/joinTrip/:id',isAuth(true),handlers.get.joinTrip);

router.post('/offerTrip', isAuth(true), handlers.post.offerTrip);
module.exports = router