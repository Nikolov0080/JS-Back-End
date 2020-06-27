const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');


module.exports = {
    createToken(data) {// creates the jwt so it can be used
        return jwt.sign({ _id: data._id }, secret, { expiresIn: '6h' });
    },
    verifyToken(token) { // checks for a token and returns promise or rejection
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, data) => {
                if (err) { reject(err); return; }
                resolve(data);
            });
        })
    }
}