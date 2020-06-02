// TODO: Require Controllers...
const controllers = require('../controllers/index');

module.exports = (app) => {

    app.get('/', controllers.All);
    app.get('/about', controllers.about);
    app.get('/create', controllers.create);
    app.get('/details/:id', controllers.details)
    app.post('/create', controllers.createCube);
    app.get('/:_id', controllers.deleteItem); // here it deletes...
};