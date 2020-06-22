const routers = require('../routers');

module.exports = (app) => {
    app.use('/home', routers.home);
}