const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');

function getContentType(url) {

    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('js')) {
        return 'text/js';
    } else if (url.endsWith('png')) {
        return 'text/png';
    } else if (url.endsWith('ico')) {
        return 'text/ico';
    } else if (url.endsWith('jpg')) {
        return 'text/jpg';
    } else if (url.endsWith('ico')) {
        return 'text/ico';
    }

}

module.exports = (req, res) => {

    let pathname = url.parse(req.url).pathname;

    if ((pathname.startsWith('/content') || pathname.startsWith('')) && req.method === 'GET') {

        if (pathname.endsWith('.jpg')
            || pathname.endsWith('.png')
            || pathname.endsWith('.jpeg')
            || pathname.endsWith('.ico')
            && req.method === 'GET') {

            fs.readFile((`./${pathname}`), (err, data) => {

                if (err) {
                    console.log(err);
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('ERROR ERROR ERROR!');
                    res.end();
                    return;
                }

                res.writeHead(
                    200,
                    { 'Content-Type': getContentType(pathname) }
                );

                res.write(data);
                res.end();
            })
        } else {

            fs.readFile((`./${pathname}`), 'utf8', (err, data) => {

                if (err) {
                    console.log(err);
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('ERROR ERROR ERROR!');
                    res.end();
                    return;
                }

                res.writeHead(
                    200,
                    { 'Content-Type': getContentType(pathname) }
                );

                res.write(data);
                res.end();
            })
        }



    } else {
        return true;
    }
}



