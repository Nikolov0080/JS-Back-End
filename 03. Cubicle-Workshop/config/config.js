module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://Vipper404:${process.env.DB_PASSWORD}@cluster0-nudca.mongodb.net/Cubicle?retryWrites=true&w=majority`
    },
    production: {}
};