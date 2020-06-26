

module.exports = {
    get: {
        home: (req, res, next) => {
            console.log(req.user); // ===> User Data
            res.render('home');
        },
        post: {

        }

    }
}