const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const users = require('./users');

function auth(req, res, next) {
    const authUser = users.
        find(user => user.id === req.session.userId);

    if (!authUser) {
        res.status(401).send('Unauthorized!');
        return;
    }

    req.user = authUser;
    next();
}

app.use(
    session(
        { secret: 'cat' },
        { httpOnly: true },
        { secure: true }
    ));



app.use(cookieParser());
app.use(bodyParser.urlencoded());

app.get('/protected', auth, (req, res) => {
    res.send("This is protected Page sori lek");
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('pages', 'login.html'))

});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }

    //    res.send('<h4>logged out</h4>');
       
 
            res.redirect('/');
     
    })
})

app.post('/login', (req, res) => {
    console.log(req.body);

    const authUser = users.
        find(user => user.username === req.body.username);



    if (authUser.password != req.body.password) {
        res.sendFile(path.resolve('pages', '404.html'));
        return
    }

    req.session.userId = authUser.id;

    //
    fs.writeFile(path.resolve('loginDataStorage', 'data.json'), JSON.stringify(authUser, null, 2), (err) => {
        if (err) {
            console.log('Error!');
        }
    })
    //     
    res.redirect('/');
})


app.get('/', (req, res) => {
    // res.cookie('test_cookie', { test: 124 }).send('<h1>DA</h1>');
    res.send('Home Page :)');
    // res.locals
});



app.listen(3000, () => console.log('server is Up for you on port 3000'));