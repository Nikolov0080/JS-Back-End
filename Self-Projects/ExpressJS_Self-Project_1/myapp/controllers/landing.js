const dataBase = require('../DataBase/db');


exports.get_landing = function (req, res, next) {//get
    res.render('landing', { title: 'Express' });
}


exports.submit_lead = function (req, res, next) {//post

    const date = new Date();
    const todayNumber = date.getDate();

    const userData = {
        ...req.body,
        todayNumber
    }

    const emailModel = dataBase.emailModel(userData);

    emailModel.save(function (err) {
        if (err) return; console.error(err);

        console.log(`${emailModel} is saved in the data base!`);
    });

    res.redirect('/');
}

exports.getAll = function (req, res, next) {

    const results = dataBase.getAllUsers.find({ todayNumber: 7 })
    results.count(true).then(a => console.log(a))
    results.toArray().then(a => console.log(a));

    res.render('layout', { data: 'Data' });
}

