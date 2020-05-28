var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { Design } = require('../dataBase/schemas')
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
    imageUrl: req.body.ImageUrl,
    designStyle: req.body.designStyle,
    description: req.body.description
  })

  new_Design.create((err) => {
    if (err) { return err };
  })

  res.redirect('/');
})

router.get('/all', async (req, res) => { // finish here and render the page TODO
  mongoose.connect('mongodb://localhost:27017/myapp', { useUnifiedTopology: true, useNewUrlParser: true })

  const data = await Design.find({});
  // console.log(data);
  const input = { a: ['a', 'b', 'c'] }
  res.render('all', { data });
  // res.end();
})

module.exports = router;
