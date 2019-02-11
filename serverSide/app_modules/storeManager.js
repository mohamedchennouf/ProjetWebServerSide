var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

// Connection URL
const url = "mongodb://Admin:Admin1@ds111455.mlab.com:11455/prod_moxaruga";

const dbName = "prod_moxaruga";

exports.add_store = function (request) {
    return new Promise(fun => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                var db = client.db(dbName);
                if (!err && request['nom']!=null && request['adresse']!=null && request['ville']!=null && request['longitude']!=null && request['latitude']!=null) {
                    db.collection("magasin")
                        .insertOne({nom:request['nom'], adresse:request['adresse'], ville:request['ville'].toUpperCase(),longitude:request['longitude'], latitude:request['latitude']})
                        .then(x => fun(x));
                } else {
                    fun(-1);
                }
            }
        );
    });
};