const { body } = require('express-validator');
const { check } = require('express-validator');


exports.register = [
    check('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 chars long'),
    check('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 chars long'),
    check('password')
        .matches('rePassword').withMessage('Passwords do not match!'),
    body('rePassword').isLength({ min: 3 }).not().isEmpty()
];

// TODO finish adding as a middleware in routes/user and routes/theatre