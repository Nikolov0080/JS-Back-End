// TODO: Require Controllers...
const controllers = require('../controllers/cubes');
const accessory = require('../controllers/accessory');
module.exports = (app) => {

    app.get('/', controllers.All);
    app.get('/about', controllers.about);
    app.get('/create/cube', controllers.create);
    app.get('/details/:id', controllers.details)
    app.post('/create/cube', controllers.createCube);
    app.get('/create/accessory', accessory.createAccessory);
    app.post('/create/accessory', accessory.create);
    app.get('/attach/accessory/:_id', accessory.attachAccessory);

    app.get('*', controllers.notFound);
};