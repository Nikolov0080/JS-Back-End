let dataBase = require('../DataBase/db');


exports.get_landing = function (req, res, next) {
    res.render('landing', { title: 'Express' });
}


exports.submit_lead = function (req, res, next) {
    console.log(req.body);
    dataBase.create(req.body.lead_email);
    res.redirect('/')
}
