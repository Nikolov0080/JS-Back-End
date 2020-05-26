const express = require('express');
const app = express();
const port = 3000;
const homeRouter = require('./routes/home-page');
const searchRouter = require('./routes/search');
const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'))

app.use('/', homeRouter);
app.use('/', searchRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return;
    }

    console.log('server is up')
});

app.get('*', (req, res) => {
    
    res.send('PAGE NOT FOUND!')
})
