const controllers = require('../controllers/cubes');
const accessory = require('../controllers/accessory');
const users = require('../users/auth');
const { auth, isLogged } = require('../controllers/user')

module.exports = (app) => {

    app.get('/', controllers.All);
    app.get('/about', controllers.about);
    app.get('/create/cube', auth, controllers.create);
    app.get('/details/:id', controllers.details)
    app.post('/create/cube', controllers.createCube);
    app.get('/create/accessory', auth, accessory.createAccessory);
    app.post('/create/accessory', accessory.createNewAccessory);
    app.get('/attach/accessory/:id', accessory.attachAccessory);
    app.post('/attach/accessory/:id', accessory.attachAccessoryPOST);
    app.get('/edit/:id', controllers.editGET);
    app.get('/delete/:id', controllers.deleteGET);
    app.post('/edit/:id', controllers.editPOST);
    app.post('/delete/:id', controllers.deletePOST);
    // AUTH

    app.get('/login',isLogged, users.loginGET);
    app.get('/register', isLogged, users.registerGET);
    app.post('/register', users.registerPOST);
    app.post('/login', users.loginPOST);

    app.get('/logout', users.logout);
    // TODO create login,register,edit and delete POST routes!

    // AUTH

    app.get('*', controllers.notFound);
};