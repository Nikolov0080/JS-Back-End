const express = require('express');
const app = express();
const port = 3000;
const homeRouter = require('./routes/home-page');


app.use('/', homeRouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return;
    }

    console.log('server is up')
});



app.get('/search/:keyword', (req, res) => {
    const keyword = req.params.keyword
    res.send(`keyword: ${keyword}`)
})

app.get('*', (req, res) => {
    res.send('PAGE NOT FOUND!')
})
