const fs = require('fs');
let db = (__dirname + '/config/database.json').replace('\controllers', '');

exports.about = (req, res) => {
    res.render('about');
}

exports.create = ((req, res) => {
    res.render('create');
})


exports.createCube = (req, res) => {
    let cubeData = { ...req.body }

    fs.readFile(db, (err, data) => {
        if (err && err.code) { console.log(err); return; }

        const fileData = JSON.parse(data);
        const cubeId = fileData.length;
        const finalCubeData = { ...cubeData, cubeId }
        fileData.push(finalCubeData);
        let file = JSON.stringify(fileData, null, 2);
        fs.writeFile(db, file, error => console.error);
        console.log('CUBE ' + cubeData.name + ' CREATED!');
        res.redirect('/');
    });
}

exports.All = (req, res) => {

    fs.readFile(db, (err, data) => {
        const cubes = JSON.parse(data);
        res.render('index', { cubes });
    });
}

exports.details = (req, res) => {


    fs.readFile(db, (err, data) => {
        const cubes = JSON.parse(data);
        const currentCube = cubes.find(item => item.cubeId == req.params.id);

        res.render('details', { currentCube });
    });
}


