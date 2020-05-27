var express = require('express');
var router = express.Router();
// const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const Design = require('../dataBase/schemas').Design
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', (req, res) => {
  console.log(req.body);

  mongoose.connect('mongodb://localhost:27017/myapp', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log('Connected!!!')
    })



  const new_Design = new Design({
    name: req.body.name,
    ImageUrl: req.body.ImageUrl,
    designStyle: req.body.designStyle,
    description: req.body.description
  })

  new_Design.save((err) => {
    if (err) { return err };
  })


  res.redirect('/');
})

module.exports = router;
