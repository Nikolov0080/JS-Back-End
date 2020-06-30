const { body } = require('express-validator');
const { check } = require('express-validator');
const User = require('../handlers/users/User');




exports.register = [
    check('username').not().isEmpty().withMessage("Enter username"),
    check('username').isLength({ min: 3 }).withMessage('Username too short'),

    check('password').not().isEmpty().withMessage("Enter password"),
    check('password').isLength({ min: 3 }).withMessage('Password too short'),
    body('rePassword').not().isEmpty().withMessage('Repeat Password is required'),
    
    body('username').custom(async (username) => {
        const user = await User.findOne({ username });
        if (user) {
         return Promise.reject('Username already in use');
        } 
    })
];

exports.login = [
    check('username').not().isEmpty().withMessage("Enter username"),
    check('username').isLength({ min: 3 }).withMessage('Username too short'),

    check('password').not().isEmpty().withMessage("Enter password"),
    check('password').isLength({ min: 3 }).withMessage('Password too short'),
     
    body('username').custom(async (username) => {
        const user = await User.findOne({ username });
        if (!user) {
         return Promise.reject('Username not found try again');
        } 
    })
]

// TODO finish adding as a middleware in routes/user and routes/theatre