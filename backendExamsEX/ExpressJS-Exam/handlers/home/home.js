const Theatres = require('../theatre/Theatre');
let isLogged = false;

module.exports = {
    get: {
        home: async (req, res, next) => {

            const allTheatres = await Theatres.find().lean();

            req.user !== undefined ? isLogged = true : isLogged = false;

            res.render('home', {
                isLogged,
                allTheatres
            });
        },
        async sort(req, res, next) {

            const da = await Theatres.find().lean();

            const allTheatres = da.sort((a, b) => {
                return b.usersLiked.length - a.usersLiked.length
            });

            req.user !== undefined ? isLogged = true : isLogged = false;

            res.render('home', {
                isLogged,
                allTheatres
            });
        },
       async sortDate(req, res, next) {
            const da = await Theatres.find().lean();

            const allTheatres = da.sort((a, b) => {
                return b.createdAt - a.createdAt
            });
// .split('')[1].split(' ')
            req.user !== undefined ? isLogged = true : isLogged = false;

            res.render('home', {
                isLogged,
                allTheatres
            });
        },
        post: {

        }

    }
}