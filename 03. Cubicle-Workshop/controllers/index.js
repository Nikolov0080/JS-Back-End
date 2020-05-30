const fs = require('fs');

exports.createCube = (req, res) => {
    const cubeData = { ...req.body }
    let db = (__dirname + '/config/database.json').replace('\controllers', '');

    fs.readFile(db, (err, data) => {
        if (err && err.code) { console.log(err); return; }

        const fileData = JSON.parse(data);
        fileData.push(cubeData);
        let file = JSON.stringify(fileData, null, 2);
        fs.writeFile(db, file, error => console.error);
        res.redirect('/');
    })
}