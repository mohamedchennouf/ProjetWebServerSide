var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

// Connection URL
const url = "mongodb://Admin:Admin1@ds111455.mlab.com:11455/prod_moxaruga";

const dbName = "prod_moxaruga";

exports.calag = function(title, fukfuk, ids) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      if (!err) {
        var resultat = db
          .collection("france")
          .find({ id: { $regex: "[0123456789]*" } })
          .limit(100)
          .toArray();

        resultat = db
          .collection("france")
          .find({
            states: { $regex: "^((?!en:nutrition-facts-to-be-completed).)*$" }
          })
          .limit(10)
          .toArray();

        db.collection("recette").insertOne({ title, fukfuk });
        fun(resultat);
      }
    });
  });
};

exports.postNouvelleRecette = function(title, content, product) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      if (!err) {
        var resultat = db
          .collection("france")
          .find({ id: { $regex: "[0123456789]*" }, product_name : product })
          .limit(100)
          .toArray();
        db.collection("recette").insertOne({ title : title, content:content , ingredients : [resultat], poceBlo : 5, visionageParticipatif : 0 });
        fun(resultat);
      }
    });
  });
};


exports.getRecette = function(title) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      if (!err) {
        var resultat = db
          .collection("france")
          .find({ title: { $regex: (".*"+ title +".*") } })
          .limit(100)
          .toArray();
          db.products.update(
            { title: { $regex: (".*"+ title +".*") } },
            { $inc: { visionageParticipatif: 1 } }
          )
        fun(resultat)
      }
    });
  });
};

exports.getRecettes = function(number,sort, page) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      var order = {}; 
      if (!err) {
        if(sort =='popular')
          order = {poceBlo : -1}
          console.log(order); 
          console.log(eval(number) * eval(page));
        var resultat = db
          .collection("recette")
          .find({ $query: {} })
          .sort(order)
          .limit(eval(number))
          .skip(eval(number) * eval(page))
          .toArray();
        //   db.products.update(
        //     { title: { $regex: (".*"+ title +".*") } },
        //     { $inc: { visionageParticipatif: 1 } }
        // )
        fun(resultat)
      }
    });
  });
};