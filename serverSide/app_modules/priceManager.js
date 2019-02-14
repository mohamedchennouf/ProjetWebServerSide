var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

// Connection URL
const url = "mongodb://Admin:Admin1@ds111455.mlab.com:11455/prod_moxaruga";

const dbName = "prod_moxaruga";

exports.add_price = function (data) {
    return new Promise(fun => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                var db = client.db(dbName);
                if (!err && data['food'] != null && data['magasin'] != null && data['prix'] != null) {
                    db.collection("prix")
                        .insertOne({ food: data['food'], magasin: data['magasin'], prix: data['prix'], date: (new Date()).toLocaleDateString('en-GB')})
                        .then(x => fun(x));
                } else {
                    fun(-1);
                }
            }
        );
    });
};

exports.get_prices = function (data) {
    return new Promise(fun => {
        MongoClient.connect(
            url,
            { useNewUrlParser: true },
            function (err, client) {
                var db = client.db(dbName);
                if (!err) {
                    console.log(data);
                    request = {}
                    try {
                        request['magasin'] = data['magasin'];
                    }
                    catch (SyntaxError) {
                        request['ville'] = data['ville'];
                    }
                    
                    if (comparateur == "<=") {
                        request['prix'] = {lte: data[prix]};
                    }
                    else if (comparateur == ">=") {
                        request['prix'] = {gte: data[prix]};
                    }
                    else {
                        request['prix'] = {eq: data[prix]};
                    }

                    db.collection("prix")
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