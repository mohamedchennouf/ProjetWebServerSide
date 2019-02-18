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
                if (!err && request['nom'] != null && request['adresse'] != null && request['ville'] != null && request['longitude'] != null && request['latitude'] != null) {
                    db.collection("magasin")
                        .insertOne({ nom: request['nom'], adresse: request['adresse'], ville: request['ville'].toUpperCase(), longitude: request['longitude'], latitude: request['latitude'] })
                        .then(x => fun(x));
                } else {
                    fun(-1);
                }
            }
        );
    });
};

exports.get_stores_by_city = function (data) {
    return new Promise(fun => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                var db = client.db(dbName);
                if (!err && data['ville'] != null) {
                    db.collection("magasin")
                        .find({ville: data['ville'].toUpperCase()})
                        .toArray()
                        .then(x => fun(x));
                } else {
                    fun(-1);
                }
            }
        );
    });
};

exports.get_stores_by_name = function (data) {
    return new Promise(fun => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                var db = client.db(dbName);
                if (!err && data['ville'] != null && data['nom'] != null) {
                    db.collection("magasin")
                        .find({ville: data['ville'].toUpperCase(), nom: {$regex: ".*" + data['nom'] + ".*"}})
                        .toArray()
                        .then(x => fun(x));
                } else {
                    fun(-1);
                }
            }
        );
    });
};

exports.get_cities = function (data) {
    return new Promise(fun => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                var db = client.db(dbName);
                if (!err && data['ville'] != null) {
                    var request = {ville: {$regex: ".*" + data['ville'].toUpperCase() + ".*"}};
                    console.log(request);
                    db.collection("magasin")
                        .find(request)
                        .toArray()
                        .then(x => fun(x));
                } else {
                    fun(-1);
                }
            }
        );
    });
};