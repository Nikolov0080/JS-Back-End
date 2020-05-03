var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    createItem(db)
});

function createItem(db) {
    var dbo = db.db("ExpressAppDB");
    exports.create = function (email) {
        dbo.collection("emails").insertOne( email , function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    }

}

