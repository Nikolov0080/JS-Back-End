require('dotenv').config()


module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://Vipper404:${process.env.DB_PASS}@cluster0-nudca.mongodb.net/Cubicle?retryWrites=true&w=majority`
    },
    production: {}
};

// console.log(process.env.DB_PASS)