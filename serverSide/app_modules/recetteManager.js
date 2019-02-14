var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var fs = require("fs").ObjectID;
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

exports.postNouvelleRecette = function(title, content, product, image) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      if (!err) {
        var resultat = db
          .collection("france")
          .find({ id: { $regex: "[0123456789]*" }, product_name: product })
          .limit(100)
          .toArray();

        db.collection("recette").insertOne({
          title: title,
          image: image,
          content: content,
          ingredients: [resultat],
          poceBlo: 5,
          visionageParticipatif: 0
        });
        
        fun(
          db.collection("recette").insertOne({
            title: title,
            image: image,
            content: content,
            ingredients: [resultat],
            poceBlo: 5,
            visionageParticipatif: 0
          })
        );
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
          .find({ title: { $regex: ".*" + title + ".*" } })
          .limit(100)
          .toArray();
        db.products.update(
          { title: { $regex: ".*" + title + ".*" } },
          { $inc: { visionageParticipatif: 1 } }
        );
        fun(resultat);
      }
    });
  });
};

exports.getRecettes = function(number, sort, page) {
  return new Promise(fun => {
    MongoClient.connect(url, function(err, client) {
      var db = client.db(dbName);
      var order = {};
      if (!err) {
        if (sort == "popular") order = { poceBlo: -1 };
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
        fun(resultat);
      }
    });
  });
};

exports.retrieveImage = function(id) {
  var resultat = db
    .collection("recette")
    .find({ id: id })
    .toArray();

  var image = resultat[0].image;
  if (image) {
    return base64_decode(image);
  }
};

function base64_decode(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var bitmap = new Buffer(base64str, 'base64');
  // write buffer to file
  console.log('******** File created from base64 encoded string ********');
  return bitmap;
}