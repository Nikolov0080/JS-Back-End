const express = require('express');
const app = express();
const port = 3000;
const homeRouter = require('./routes/home-page');
const searchRouter = require('./routes/search');

app.use(express.static(__dirname + '/public'))

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
