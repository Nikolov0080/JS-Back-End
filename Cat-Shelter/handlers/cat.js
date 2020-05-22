const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats');


module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {

        let catBreedPlaceholder = breeds.map(x => `<option value="${x}">${x}</option>`);
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        let file = fs.createReadStream(filePath)

        file.on('data', (data) => {
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);
            res.write(modifiedData)
        })

        file.on('end', () => {
            res.end();
        })

        file.on('error', err => {
            console.log(err)
        })

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        let file = fs.createReadStream(filePath)

        file.on('data', (data) => {
            res.write(data)
        })

        file.on('end', () => {
            res.end();
        })

        file.on('error', err => {
            console.log(err)
        })

    }
    else if (pathname === '/cats/add-breed' && req.method === 'POST') {

        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {

            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {

                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds, null, 2);
                let writeStream = fs.createWriteStream('./data/breeds.json');

                writeStream.write(json);
                console.log(`${body.breed} is added to the Data Base!`);
            })

            res.writeHead(301, { location: '/' });

            res.end();
        })
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

        let form = formidable.IncomingForm();

        form.parse(req, (res, fields, files) => {
            // console.log(fields);

            fs.readFile('./data/cats.json', (err, data) => {

                if (err) {
                    throw err;
                }

                let cats = JSON.parse(data);
                let id = cats.length + 1;
                let imageName = files.upload.name;
                let oldPath = files.upload.path;
               
            
                let newPath = "C:/catsData/" + imageName;
                console.log(newPath);
                
                fs.rename(oldPath, newPath,  (err) =>{
                    if (err) throw err;
                  
                });
                let catData = { id, ...fields, imageName }

                cats.push(catData);


                let json = JSON.stringify(cats, null, 2);
                let writeStream = fs.createWriteStream('./data/cats.json');

                writeStream.write(json);
                console.log(`A new Cat with name: ${fields.name} has been added to the Data Base!`);
            })


            // TODO save the Cat-Data and the Image-file.
        })

    }
    else {
        return true;
    }

}
