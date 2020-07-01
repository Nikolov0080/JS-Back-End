const { body } = require('express-validator');
const { check } = require('express-validator');
const User = require('../handlers/users/User');

const LettersAndDigitsRegex = /^[\d A-z]+$/
const URL_Regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?=]*)/

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

exports.validateCreate = [
    // title
    body('title').not().isEmpty().withMessage("Title cannot be empty!"),
    body('title').isLength({ min: 6 }).withMessage('Title must be at least 6 characters'),
    body('title').matches(LettersAndDigitsRegex).withMessage('Title must be only English characters and/or Numbers'),

    // description
    body('description').not().isEmpty().withMessage('Description cannot be empty'),
    body('description').isLength({ min: 20, max: 5060 }).withMessage('Description minimum symbols is 20'),
    body('description').matches(LettersAndDigitsRegex).withMessage('Description must contain only English letters and numbers'),
    // imageUrl
    body('imageUrl').not().isEmpty().withMessage('Image URL is required'),
    body('imageUrl').matches(URL_Regex).withMessage('Please enter a valid image URL')
]

