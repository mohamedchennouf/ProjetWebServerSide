var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var fs = require("fs").ObjectID;

// Connection URL
const url = "mongodb://Admin:Admin1@ds111455.mlab.com:11455/prod_moxaruga";

const dbName = "prod_moxaruga";

exports.subscribe = function(tab) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      //TODO faire changer ça à rooudy.
      "Nom", "Prénom", "Email", "Pseudo", "Mot De Passe";
      if (!err) {
        var resultat = db
          .collection("user")
          .find({ id: { $regex: tab[2] } })
          .limit(100)
          .toArray();

        if (resultat.length != 0) {
          db.collection("user").insertOne({
            Name: tab[0],
            FirstName: tab[1],
            Email: tab[2],
            Pseudo: tab[3],
            Password: tab[4]
          });

          fun(true);
          return;
        }
        fun(false);
        return;
      }
    });
  });
};

exports.connect = function(tab) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      //TODO faire changer ça à rooudy.
      "Nom", "Prénom", "Email", "Pseudo", "Mot De Passe";
      if (!err) {
        var resultat = db
          .collection("user")
          .find({ id: { $regex: tab[2] } })
          .limit(100)
          .toArray();

        if (resultat.length != 0) {
          db.collection("user").insertOne({
            Name: tab[0],
            FirstName: tab[1],
            Email: tab[2],
            Pseudo: tab[3],
            Password: tab[4]
          });

          fun(true);
          return;
        }
        fun(false);
        return;
      }
    });
  });
};
