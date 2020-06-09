const path = require('path');
const fs = require('fs');


function history(authUser) {

    fs.readFile(path.resolve('loginDataStorage', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let newData = JSON.parse(data);

        console.log(newData);

        newData.loginHistory.push(authUser);

        fs.writeFile(path.resolve('loginDataStorage', 'data.json'), JSON.stringify(newData, null, 2), (err) => {
            if (err) {
                console.log('Error!');
            }
        })

    });
}



module.exports = history;