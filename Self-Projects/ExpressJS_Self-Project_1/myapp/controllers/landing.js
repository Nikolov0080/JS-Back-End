const dataBase = require('../DataBase/db');
const { json } = require('express');
const moment = require('moment');

exports.get_landing = function (req, res, next) {//get
    res.render('landing', { title: 'Express' });
}


exports.submit_lead = function (req, res, next) {//post

    const timeCreated = moment().format('MMMM Do YYYY, h:mm:ss a');

    const userData = {
        ...req.body,
        timeCreated
    }

    const emailModel = dataBase.emailModel(userData);

    emailModel.save(function (err) {
        if (err) return; console.error(err);

        console.log(`${emailModel} is saved in the data base!`);
    });

    res.redirect('/all');
}

exports.getAll = function (req, res, next) {

    const results = dataBase.getAllUsers.find({})

    results.toArray().then(usersList => {
        res.render('layout', { data: usersList });
    });


}

exports.deleteOne = function (req, res, next) {
  console.log(req.body)
    res.redirect('/all')
}

