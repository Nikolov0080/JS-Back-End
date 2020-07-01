const moment = require('moment');
const Theatre = require('./Theatre');
const validatorResults = require('express-validator').validationResult


module.exports = {
    get: {
        create(req, res, next) {
            let isLogged;
            req.user !== undefined ? isLogged = true : isLogged = false
            res.render('create-theatre', {
                isLogged
            });
        },
        details(req, res, next) {

            Theatre.findOne(req.params).then((data) => {
                const { imageUrl, title, description } = data;
                let liked;
                data.usersLiked.includes(req.user._id) !== true ? liked = true : liked = false
                const isCreator = (data.creatorId == req.user._id);

                res.render('theatre-details', {
                    imageUrl,
                    isCreator,
                    userId: req.user._id,
                    _id: data._id,
                    liked,
                    isLogged: true,
                    title,
                    description
                });
            }).catch((e) => {

                console.error(e);
            })

        },
        async like(req, res, next) {
            console.log(req.params);
            const [userId, theatreId] = req.params._Id.split('---')
            // todo check for liked user and handle error
            const toUpdate = await Theatre.findOneAndUpdate({ _id: theatreId }, { "$push": { "usersLiked": userId } });

            res.redirect('/home/')
        },
        async edit(req, res, next) {
            console.log(req.params);

            const { title, description, imageUrl } = await Theatre.findOne({ _id: req.params._Id });

            res.render('edit-theatre', {
                title,
                description,
                imageUrl,
                _id: req.params._Id
            });
        },
        delete(req, res, next) {

            Theatre.deleteOne(req.params).then((result) => {
                console.log(`Deleted ${result.deletedCount}`)
            })
            res.redirect('/home/')
        }
    },
    post: {
        create(req, res, next) {

            const errors = validatorResults(req);

            if (!errors.isEmpty()) {
                console.log(errors)
                return res.render('create-theatre', { message: errors.errors[0].msg ,isLogged:true})
            }


            const { title, description, imageUrl, isPublic } = req.body;

            const createdAt = moment().format('lll');
            const creatorId = req.user._id;

            const theatreData = {
                title,
                description,
                imageUrl,
                isPublic: isPublic == 'on' ? true : false,
                createdAt,
                creatorId
            }

            Theatre.create(theatreData).then((result) => {
                console.log(`theatre: ${result.title} created successful!`);
               return res.redirect('/home/');
            }).catch((e) => {

                res.render('create-theatre', {
                    title,
                    description,
                    imageUrl,
                    message: "Something went wrong try again with different data"
                });
            })



        },
        edit(req, res, next) {
            const { title, description, imageUrl, isPublic } = req.body;

            Theatre.updateOne({ _id: req.params._Id }, {
                title,
                description,
                imageUrl,
                isPublic
            }).then(console.log)

            res.redirect('/home/')
        }
    }
}