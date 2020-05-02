const express = require('express');
const port = 3000;
const app = express();
const fs = require('fs');

app.set('view', './views');

app.get('/', (req, res) => {
    res.send('123')
})

app.listen(port, () => console.log(`server up to ${port}`))
