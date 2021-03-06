var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

// Connection URL
const url = "mongodb://Admin:Admin1@ds111455.mlab.com:11455/prod_moxaruga";

const dbName = "prod_moxaruga";

exports.getFirstFood = function () {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find({ product_name_fr: { $exists: true } }).limit(100).toArray()
            .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
};

exports.postFoods = function (data) {
  var request = convert(data);
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
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

exports.postFoodsOne = function (data) {
  var request = convert(data);
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find(request)
            .limit(1)
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
  var json = {};
  dict["nom"] = "product_name_fr";
  dict["marque"] = "brands";
  dict["motcle"] = "_keywords";
  dict["score"] = "custom_score";
  for (field in data) {
    if (dict[field] != null) {
      if (field == "motcle" && (typeof data[field]) == 'object') {
        var list = [];
        var mots = data[field];
        for (i = 0; i < mots.length; i++) {
          var req = {}
          req["_keywords"] = new RegExp(mots[i], 'i');
          console.log(req);
          list.push(req);
        }
        if (list.length > 0) {
          json['$or'] = list;
        }
      }
      else if (field == "score") {
        json[dict[field]] = { $lte: data[field] };
      }
      else {
        json[dict[field]] = new RegExp(data[field], 'i');
      }
    };
  }
  console.log(json);
  return json;
};

exports.get_all_foods_size = function () {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find({}).toArray()
            .then(x => fun(x.length));
        } else {
          fun(-1);
        }
      }
    );
  });
}

exports.getAllFoodsWithName = function (i) {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find({ product_name_fr: { $exists: true } })
            .skip(i * 500)
            .limit(500)
            .toArray()
            .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
};

exports.get_foods_with_nutriments = function () {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find({ nutriments: { $gt: {} } }).toArray()
            .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
}

exports.get_100_foods = function (i) {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find({ product_name_fr: { $exists: true } })
            .skip(i * 100)
            .limit(100)
            .toArray()
            .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
}

exports.get_foods_from_list = function (data, x) {
  var request = convert(data);
  var list = [];
  var list2 = [];
  for (i = 0; i < x.length; i++) {
    list.push({ "id": x[i]['food'] });
  }
  if (list.length > 0) {
    var id_query = { $or: list };
    list2.push(id_query);
  }
  list2.push(request);
  var query = { $and: list2 };
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france")
            .find(query)
            .toArray()
            .then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  });
}

exports.maj_score = function (data) {
  return new Promise(fun => {
    if (data['nutriments'] != null) {
      var nutriments = data['nutriments'];
      if (nutriments['sodium_100g'] != null && nutriments['saturated-fat_100g'] != null
        && nutriments['sugars_100g'] != null && nutriments['energy_100g'] != null && nutriments['proteins_100g'] != null) {
        MongoClient.connect(
          url,
          { useNewUrlParser: true },
          function (err, client) {
            var db = client.db(dbName);
            if (!err) {
              var score = compute_score(nutriments);
              db.collection("france").updateOne(
                { _id: data['_id'] },
                { $set: { custom_score: score } },
                { upsert: false }
              ).then(x => { fun(x); })
            } else {
              fun(-1);
            }
          }
        );
      } else {
        fun(-1);
      }
    } else {
      fun(-1);
    }
  }
  );
}

exports.fixe_score = function (data) {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france").find({}).forEach(function (bouya) {
            db.collection("france").update({ _id: bouya._id }, { $set: { custom_score: Math.floor(Math.random() * 100) + 42 } })
          }).then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  }
  );
}

exports.maj_prix = function () {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france").find({}).forEach(function (bouya) {
            db.collection("france").update({ _id: bouya._id }, { $set: { price: parseFloat(getRandomFloat(0, 10).toFixed(2)) } })
          }).then(x => fun(x));
        } else {
          fun(-1);
        }
      }
    );
  }
  );
}

exports.deletefield = function () {
  return new Promise(fun => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function (err, client) {
        var db = client.db(dbName);
        if (!err) {
          db.collection("france").update({}, { $unset: { custom_score: {$gte: 0} }}, { multi: true }).then(x => fun(x));;
        } else {
          fun(-1);
        }
      }
    );
  }
  );
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function compute_score(nutriments) {
  var score = 0;
  var sodium = nutriments['sodium_100g'];
  var saturatedFat = nutriments['saturated-fat_100g'];
  var sugars = nutriments['sugars_100g'];
  var energy = nutriments['energy_100g'];
  var proteins = nutriments['proteins_100g'];
  //var fiber = nutriments['fiber_100g'];

  if (sodium > 0.9) {
    score += 10;
  } else if (sodium > 0.81) {
    score += 9;
  } else if (sodium > 0.72) {
    score += 8;
  } else if (sodium > 0.63) {
    score += 7;
  } else if (sodium > 0.54) {
    score += 6;
  } else if (sodium > 0.45) {
    score += 5;
  } else if (sodium > 0.36) {
    score += 4;
  } else if (sodium > 0.27) {
    score += 3;
  } else if (sodium > 0.18) {
    score += 2;
  } else if (sodium > 0.09) {
    score += 1;
  }

  if (saturatedFat > 10) {
    score += 10;
  } else if (saturatedFat > 9) {
    score += 9;
  } else if (saturatedFat > 8) {
    score += 8;
  } else if (saturatedFat > 7) {
    score += 7;
  } else if (saturatedFat > 6) {
    score += 6;
  } else if (saturatedFat > 5) {
    score += 5;
  } else if (saturatedFat > 4) {
    score += 4;
  } else if (saturatedFat > 3) {
    score += 3;
  } else if (saturatedFat > 2) {
    score += 2;
  } else if (saturatedFat > 1) {
    score += 1;
  }

  if (sugars > 13.5) {
    score += 10;
  } else if (sugars > 12) {
    score += 9;
  } else if (sugars > 10.5) {
    score += 8;
  } else if (sugars > 9) {
    score += 7;
  } else if (sugars > 7.5) {
    score += 6;
  } else if (sugars > 6) {
    score += 5;
  } else if (sugars > 4.5) {
    score += 4;
  } else if (sugars > 3) {
    score += 3;
  } else if (sugars > 1.5) {
    score += 2;
  } else if (sugars >= 0) {
    score += 1;
  }

  if (energy > 3350) {
    score += 10;
  } else if (energy > 3015) {
    score += 9;
  } else if (energy > 2680) {
    score += 8;
  } else if (energy > 2345) {
    score += 7;
  } else if (energy > 2010) {
    score += 6;
  } else if (energy > 1675) {
    score += 5;
  } else if (energy > 1340) {
    score += 4;
  } else if (energy > 1005) {
    score += 3;
  } else if (energy > 670) {
    score += 2;
  } else if (energy > 335) {
    score += 1;
  }

  if (proteins > 8) {
    score -= 5;
  } else if (proteins > 6.4) {
    score -= 4;
  } else if (proteins > 4.8) {
    score -= 3;
  } else if (proteins > 3.2) {
    score -= 2;
  } else if (proteins > 1.6) {
    score -= 1;
  }

  /*if (fiber > 3.5) {
    score -= 5;
  } else if (fiber > 2.8) {
    score -= 4;
  } else if (fiber > 2.1) {
    score -= 3;
  } else if (fiber > 1.4) {
    score -= 2;
  } else if (fiber > 0.7) {
    score -= 1;
  }*/

  return score;
}