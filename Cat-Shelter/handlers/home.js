const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');
const cat = require('./cat');


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {


            let modifiedCat = cats.map((cat) => {

                const image = path.join('./content/images/' + cat.imageName)

                return `<li>
                <img src="${image}" alt="">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`
            });

            let modifiedData = data.toString().replace('{{cats}}', modifiedCat);

            if (err) {
                console.log(err);
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(modifiedData);
            res.end();
        })

    } else {
        return true;
    }
}


