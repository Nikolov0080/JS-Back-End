const routes = require('../routes');


module.exports = (app) => {

    app.use('/home', routes.home);

    app.use('/users', routes.users);

    app.use('/courses', routes.courses); // TODO
}