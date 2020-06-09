const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = 3000
const app = express();

app.use(cookieParser());
app.use(session(
    { secret: 'sickRet' },
    { httpOnly: true },
    { secure: true }
));



app.get('/', (req, res) => {

    res.cookie("message", 'FUCK');

    req.session.id = 1;
    req.session.email = 'lalalal@hahah.hoho'

    res.end('Cookie set!');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

app.get('/search', (req, res) => {
    res.send({
        pageMessage: "indexPage",
        ...req.cookies,
        session: req.session
    });
})