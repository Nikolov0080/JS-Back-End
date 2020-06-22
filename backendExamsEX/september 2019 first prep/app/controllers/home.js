module.exports = {
    get: {
        home: (req, res, next) => {
            res.render('homePage.hbs', { pageTitle: 'Welcome' });
        }
    }
}