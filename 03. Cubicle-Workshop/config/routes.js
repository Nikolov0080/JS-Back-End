// TODO: Require Controllers...
const controllers = require('../controllers/index');

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/create', (req, res) => {
        res.render('create');
    });

    app.post('/create', controllers.createCube);
};