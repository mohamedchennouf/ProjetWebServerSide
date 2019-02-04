var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

// Connection URL
const url = "mongodb://Admin:Admin1@ds111455.mlab.com:11455/prod_moxaruga";

const dbName = "prod_moxaruga";

exports.getFirstFood = function() {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      function(err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
          .find({}).limit(10).toArray()
          .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
};

exports.postFoods = function(req) {
  data = JSON.parse(Object.keys(req.body)[0])
  var request = convert(data);
  console.log(request);
  return new Promise(fun => {
    MongoClient.connect(
      url,
      function(err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
          .find(request)
          .limit(10)
          .toArray()
          .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
};

function convert(data) {
  var dict = {};
  dict["nom"] = "product_name_fr";
  dict["marque"] = "brands";
  var res = "{";
  var i = 0;
  for (field in data) {
    if (i > 0) {
      res+= ",";
    }
    res+= "\"" + dict[field] + "\"" + ":" + "\"" + data[field] + "\"";
    i++;
  }
  res+="}";
  return res;
};