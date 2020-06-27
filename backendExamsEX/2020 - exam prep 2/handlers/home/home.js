const Courses = require('../courses/Courses');


module.exports = {
    get: {
        home: async (req, res, next) => {
            const allCourses = await Courses.find().lean();
            if (req.user) {
                return res.render('home', {
                    isLogged: req.user !== undefined,
                    username: req.user.username,
                    allCourses
                });
            }

            return res.render('home', {
                isLogged: req.user !== undefined,
                allCourses
            });

        },
        post: {

        }

    }
}