const express = require('express');
const app = express();
const port = 3000;

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return;
    }

    console.log('server is up')
});


app.get('/', (req, res, next) => {

    req.data = '0010011'; // data from here
    next();
}, (req, res) => {
    res.status(200).send(`the data: ${req.data}`); // goes here
}) 

app.post('/', (req, res) => {
    res.send('users: [1,2,3]')
})

app.get('/search', (req, res) => {
    res.send('123123123')
})

