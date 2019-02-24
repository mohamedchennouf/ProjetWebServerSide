const express = require("express");
const foodManager = require("./app_modules/foodManager");
const recetteManager = require("./app_modules/recetteManager");
const userManager = require("./app_modules/userManager");
const storeManager = require("./app_modules/storeManager");
const priceManager = require("./app_modules/priceManager");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const timeout = require('connect-timeout')

app.use(timeout(120000));
// var multer = require('multer');
// var multerData = multer();

// app.configure(function() {
// });

// Allow parsing cookies from request headers
// app.use(cookiesParser.parse);
// Session management
// app.use(session.Session({
//     // Private crypting key
//     secret: "cacahueteCasseroleZoro",
//     store: new express.session.MemoryStore({ reapInterval: 60000 * 10 })
//   })
// );

app.use(cookieParser());
app.use(
  session({
    secret: "cacahueteCasseroleZoro",
    // store: new express.session.MemoryStore({ reapInterval: 60000 * 10 })
  })
);

function requireLogin(req, res, next) {
  if (req.session[req.cookies.connect]) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/clientSide"));

const pathClientSide =
  __dirname.substring(0, __dirname.length - 10) + "clientSide";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

server.listen(port, function () {
  console.log("Server listening on port " + port);
});

app.route("/index").get(requireLogin, function (req, res) {
  res.sendfile("./DebugUI/xxx.html");
});

///// FOODS ROUTES \\\\\
app.route("/API/FOODS/RANDOM").get(function (req, res) {
  foodManager.getFirstFood().then(x => res.send(x));
});

app.route("/API/FOODS").post(function (req, res) {
  data = req.body;
  foodManager.postFoods(data).then(x => check_results(x, data, res));
});

app.route("/API/FOODS/ONE").post(function (req, res) {
  data = req.body;
  foodManager.postFoodsOne(data).then(x => res.send(x));
});

app.route("/API/FOODS/MAJSCORE").get(function (req, res) {
  console.log("Start data recovery")
  foodManager.get_foods_with_nutriments().then(x => {
    console.log("End of data recovery")
    var size = x.length;
    var j = 0;
    for (i = 0; i < size; i++) {
      foodManager.maj_score(x[i]).then(y => {
        j++;
        console.log("Done " + j + " / " + size);
      });
    }
    res.sendStatus(200);
  });
});

app.route("/API/FOODS/RANDOM_PRICE").get(function (req, res) {
  console.log("Start");
  foodManager.maj_prix().then(x => {
    console.log("End");
    res.sendStatus(200);
  });
});

app.route("/API/FOODS/FIXE_SCORE").get(function (req, res) {
  foodManager.fixe_score().then(x => {
    res.sendStatus(200);
  });
});

app.route("/API/FOODS/DELETE").get(function (req, res) {
  foodManager.deletefield().then(x => {
    res.sendStatus(200);
  });
});

///// RECETTES ROUTES \\\\\
app
  .route("/API/RECETTES")
  .post(requireLogin, function (req, res) {
    var title = req.param("title") || res.body.data.title;
    var content = req.param("content") || res.body.data.content;
    var product = req.param("product") || res.body.data.product || "";
    var image = req.param("image") || res.body.data.image;
    recetteManager
      .postNouvelleRecette(title, content, product, image)
      .then(x => res.send(x));
  })
  .get(function (req, res) {
    var resu = req.param("res") || 10;
    var sort = req.param("sort") || "normal";
    var page = eval(req.param("page")) || "0";
    recetteManager.getRecettes(resu, sort, page).then(x => res.send(x));
  });

app.route("/API/RECETTE/:title").get(function (req, res) {
  var title = req.param("title") || req.params.title || res.body.data.title;
  recetteManager.getRecette(title).then(x => res.send(x));
});

app.route("/API/RECETTE/LIKE/:id").post(requireLogin, function (req, res) {
  var id = req.param("id") || req.params.id || res.body.data.id;
  var userID = req.param("userID") || req.params.userID || res.body.data.userID;
  recetteManager.likeRecette(id, userID).then(x => res.send(x));
});

app.route("/API/RECETTE/LIKES/:id").post(requireLogin, function (req, res) {
  var id = req.param("id") || req.params.id || res.body.data.id;
  var userID = req.param("userID") || req.params.userID || res.body.data.userID;
  recetteManager.haveLikedRecette(id, userID).then(x => {
    if (x != null) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.route("/API/RECETTES/SEARCH").post(function (req, res) {
  var title = req.param("title") || res.body.data.title;
  recetteManager.getRecettesByTitle(title).then(x => res.send(x));
});

app.route("/API/RECETTES/COMMENTS").post(requireLogin, function (req, res) {
  var userID = req.param("userID") || res.body.data.userID;
  var recipeID = req.param("recipeID") || res.body.data.recipeID;
  var content = req.param("content") || res.body.data.content;
  recetteManager.addComment(userID, recipeID, content).then(x => res.send(x));
});

app.route("/API/RECETTES/COMMENT/:recipeID").get(function (req, res) {
  var recipeID =
    req.param("recipeID") || req.params.recipeID || res.body.data.recipeID;
  recetteManager.retrieveComments(recipeID).then(x => res.send(x));
});

///// STORES ROUTES \\\\\

app.route("/API/STORES/ADD").post(function (req, res) {
  data = req.body;
  foodManager.postFoods(data).then(x => test(x, data, res));
});

app.route("/API/image/:id").get(function (req, res) {
  recetteManager.retrieveImage(req.params.id).then(x => {
    if (x == undefined) {
      res.sendStatus(403);
      return;
    }
    res.contentType("png");
    res.write(x);
    res.end();
    // res.connection.end();
    return;
  });
});

app.route("/API/USER/subscribe").post(function (req, res) {
  userManager.subscribe(req.body.data).then(x => {
    if (x) {
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });
});

app.route("/API/USER/CONNECT").post(function (req, res) {
  userManager.connect(req.body.data).then(x => {
    if (x) {
      var x = hashCode("cacahueteCasseroleZoro" + req.body.data.id)
      req.session[x] = true;
      res.send(x.data);
      // ,domain:"client-testt.herokuapp.com"
      console.log();
      res.cookie('connect', x ,           {maxAge: Date.now() + 100000 ,httpOnly:false,expires:false});
      res.cookie('mail',req.body.data.id, {maxAge: Date.now() + 100000 ,httpOnly:false,expires:false});
      // res.sendStatus(200);

      res.end();
    } else {
      res.sendStatus(400);
    }
  });
});

function test(x, data, res) {
  if (x.length == 0) {
    if (data.hasOwnProperty("nom")) {
      storeManager.add_store(data).then(x => res.send(x));
    }
  }
}

app.route("/API/STORES/GET_STORES_CITY").post(function (req, res) {
  data = req.body;
  storeManager.get_stores_by_city(data).then(x => res.send(x));
});

app.route("/API/STORES/GET_STORES_CITIES").post(function (req, res) {
  data = req.body;
  if (data["villes"] != null) {
    storeManager.get_stores_by_cities(data["villes"]).then(x => {
      res.send({ stores: x });
    });
  } else {
    res.send("Clé manquante : villes");
  }
});

app.route("/API/STORES/GET_STORES_NAME").post(function (req, res) {
  data = req.body;
  storeManager.get_stores_by_name(data).then(x => res.send(x));
});

app
  .route("/API/STORES/GET_CITIES")
  .post(function (req, res) {
    data = req.body;
    storeManager.get_cities(data).then(x => check_cities(x, res));
  })
  .get(function (req, res) {
    storeManager.get_cities({ ville: "" }).then(x => check_cities(x, res));
  });


///// PRICES ROUTES \\\\\
app.route("/API/PRICES/ADD").post(function (req, res) {
  data = req.body;
  priceManager.add_price(data).then(x => res.send(x));
});

app.route("/API/FOODS/ADVANCE_SEARCH").post(function (req, res) {
  data = req.body;
  priceManager.get_prices(data).then(x => check_other_crit(res, data, x));
});

function check_other_crit(res, data, x) {
  foodManager.get_foods_from_list(data, x).then(y => res.send(y));
}

// Methodes
function check_results(x, data, res) {
  if (x.length == 0) {
    if (data.hasOwnProperty("nom") && (!data.hasOwnProperty("motcle") || data['motcle'].length == 0)) {
      str = JSON.stringify(data);
      str = str.replace(/\"nom\":/g, '"motcle":');
      json = JSON.parse(str);
      foodManager.postFoods(json).then(x => res.send(x));
    } else {
      res.send(x);
    }
  } else {
    res.send(x);
  }
}

function check_cities(x, res) {
  if (x.length != 0) {
    var cities = [];
    for (city in x) {
      if (!cities.includes(x[city]["ville"])) {
        cities.push(x[city]["ville"]);
      }
    }
    res.send({ villes: cities });
  } else {
    res.send(x);
  }
}

function hashCode(s) {
  return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}
