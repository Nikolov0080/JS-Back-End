const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
let users = require('./Statistics/users');
const history = require('./Statistics/loginHistory');
const bcrypt = require('bcrypt');
const saltRounds = 9;
const myPlainTextPassword = "password123";


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

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('pages', 'register.html'))

});

app.post('/register', (req, res, next) => {

    let { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (user) {
        res.sendFile(path.resolve('pages', 'register.html'));
        return;
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) { next(err); return; }
        users = users.concat({ id: 2, username, password: hash });
        res.redirect('/');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/');
    })
})

app.post('/login', (req, res) => {

    const authUser = users.
        find(user => user.username === req.body.username);

    bcrypt.compare(req.body.password, authUser.password)
        .then((res) => {
            if (!res) {
                res.sendFile(path.resolve('pages', '404.html'));
                return;
            }

            req.session.userId = authUser.id;

            history(authUser);
        });
  res.redirect('/');

});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('pages', 'homePage.html'));
       
});

app.listen(3000, () => console.log('server is Up for you on port 3000'));