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
                if (!err && data['food'] != null && data['nom'] != null && data['magasin'] != null && data['ville'] != null && data['prix'] != null) {
                    db.collection("prix")
                        .insertOne({ food: data['food'], nom: data['nom'], magasin: data['magasin'], ville: data['ville'], prix: data['prix'], date: (new Date()).toLocaleDateString('en-GB')})
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
                    request = {}
                    try {
                        request['magasin'] = data['magasin'];
                        if (request['magasin'] == undefined) {
                            request = {};
                            request['ville'] = data['ville'];
                        }
                    }
                    catch (e) {
                        console.err(e);
                    }

                    comparateur = data['comparateur']
                    prix = data['prix']
                    
                    if (comparateur == "<=") {
                        request['prix'] = {$lte: prix};
                    }
                    else if (comparateur == ">=") {
                        request['prix'] = {$gte: prix};
                    }
                    else {
                        request['prix'] = {$eq: prix};
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