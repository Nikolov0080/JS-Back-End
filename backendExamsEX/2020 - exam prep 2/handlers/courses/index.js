const Courses = require('./Courses');
const jwt = require('../../utils/jwt');
const { cookie } = require('../../config/config');
const moment = require('moment');

module.exports = {
    get: {
        async details(req, res, next) {

            if (req.user == undefined) {
                return res.redirect('/home/')
            }

            Courses.findOne(req.params).lean().then(async (result) => {
                const isCreator = req.user.username == result.creator;
                const userId = req.user._id;



                res.render('course-details', {
                    username: req.user.username,
                    isLogged: req.user !== undefined,
                    result,
                    isCreator

                })
            })
        },
        create(req, res, next) {
            if (req.user == undefined) {
                return res.redirect('/home/')
            }
            res.render('create-course')
        },
        delete(req, res, next) {

            if (req.user == undefined) {
                return res.redirect('/home/')
            }

            Courses.deleteOne(req.params).then(console.log)
            res.redirect('/home/');
        },
        async edit(req, res, next) {
            if (req.user == undefined) {
                return res.redirect('/home/')
            }

            const course = await Courses.findOne(req.params).lean();

            res.render('edit-course', course)
        },
        async enroll(req, res, next) {
            // { $push: { friends: friend } }

            await Courses.updateOne(req.params, { $push: { usersEnrolled: req.user._id } });

            res.redirect(`/courses/details/${req.params._id}`)
        }
    },
    post: {
        create: async (req, res, next) => {
            const time = moment().format('LTS');
            const { title, description, imageUrl, isPublic } = req.body;

            const course = {
                title,
                description,
                imageUrl,
                isPublic,
                createdAt: time,
                creator: req.user.username
            }

            await Courses.create(course).then((data) => {
                return res.redirect('/home/');
            })

            res.redirect('/courses/create/?error')
        },
        edit(req, res, next) {
            console.log(req.params);
            const { title, description, imageUrl } = req.body;
            console.log(req.body)
            Courses.updateOne(req.params, {title, description, imageUrl}).then(console.log)

            res.redirect('/home/')
        }
    }
}