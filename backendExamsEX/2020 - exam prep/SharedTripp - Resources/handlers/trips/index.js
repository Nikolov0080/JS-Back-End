const Trip = require('./Trip');
const User = require('../users/User');


module.exports = {
    get: {
        sharedTrips(req, res, next) {
            Trip.find().lean().then((allTrips) => {
                return res.render('sharedTrips', {
                    userEmail: req.user.email,
                    allTrips
                });
            });

        },
        offerTrip(req, res, next) {
            res.render('offerTrip', {
                userEmail: req.user.email
            });
        },
        tripDetails(req, res, next) {

            Trip.findById(req.params.id).lean().then(async (tripData) => {

                const driverData = await User.findById(tripData.driver);

                tripData = { ...tripData, driverEmail: driverData.email }

                return res.render('tripDetails', tripData)
            })

        },
        deleteTrip(req, res, next) {

            Trip.deleteOne({ _id: req.params.id }).then(console.log)

            res.redirect('/trips/sharedTrips');
        }
    },
    post: {
        offerTrip(req, res, next) {

            const { directions, dateAndTime, carImage, seats, description } = req.body;

            const [startPoint, endPoint] = directions.split('-').map(x => x.trim());
            const [date, time] = dateAndTime.split('-').map(x => x.trim());
            const { _id } = req.user;
            Trip.create({ startPoint, endPoint, date, time, carImage, seats, description, driver: _id })// TODO
                .then(console.log('Trip created'))
                .catch((e) => {
                    if (e) { console.error(e) }
                })
            res.redirect('/trips/sharedTrips')
        }
    }
}

