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
