const env = process.env.NODE_ENV || 'development';

require('./config/database')().then(() => {
    const app = require('express')();
    const config = require('./config/config');

    require('./config/routes')(app);
    require('./config/express')(app);

    app.listen(config.port, console.log('*** Server ready on port:' + config.port));
}).catch(e=>console.log(e))