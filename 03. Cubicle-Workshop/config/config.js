require('dotenv').config()

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: 'Cube213Workshop',
        databaseUrl: `mongodb+srv://Vipper404:${process.env.DB_PASS}@cluster0-nudca.mongodb.net/Cubicle?retryWrites=true&w=majority`
    },
    production: {}
};