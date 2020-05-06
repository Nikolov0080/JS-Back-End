let dataBase = require('../DataBase/db');


exports.get_landing = function (req, res, next) {//get
    res.render('landing', { title: 'Express' });
}


exports.submit_lead = function (req, res, next) {//post

    const date = new Date();
    const todayNumber = date.getDate();



}

