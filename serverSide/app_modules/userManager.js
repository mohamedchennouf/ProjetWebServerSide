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
          .toArray()
          .then(resultat => {
            if(resultat.length == 0) {
              console.log(resultat);
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
          });
      }
    });
  });
};

exports.connect = function(identify) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      console.log(identify)
      var user = identify.id;
      var pass = identify.password;
      console.log(user)
      if (!err) {
        db.collection("user")
          .findOne({ Email : user }).then(p => {
            console.log(p);
            if (p != null && p.Password == pass) {
              fun({ data : p.Pseudo});
              return;
            }
            fun(false);
          });
      }
    });
  });
};
