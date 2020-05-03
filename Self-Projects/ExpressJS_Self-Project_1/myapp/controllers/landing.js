let dataBase = require('../DataBase/db');


exports.get_landing = function (req, res, next) {
    res.render('landing', { title: 'Express' });
}


exports.submit_lead = function (req, res, next) {
    console.log(req.body);
    const date = new Date();

    dataBase.create({ email: req.body.lead_email, date: date.getDate() });
    res.redirect('/');
}
