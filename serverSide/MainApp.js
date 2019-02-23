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

// var multer = require('multer');
// var multerData = multer();
// app.configure(function() {
//   // Allow parsing cookies from request headers
//   this.use(express.cookieParser());
//   // Session management
//   this.use(
//     express.session({
//       // Private crypting key
//       secret: "cacahueteCasseroleZoro",
//       store: new express.session.MemoryStore({ reapInterval: 60000 * 10 })
//     })
//   );
// });

function requireLogin(req, res, next) {
  if (req.session.username) {
    // User is authenticated, let him in
    next();
  } else {
    // Otherwise, we redirect him to login form
    res.sendStatus(401);
  }
}

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/clientSide"));

const pathClientSide =
  __dirname.substring(0, __dirname.length - 10) + "clientSide";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

server.listen(port, function() {
  console.log("Server listening on port " + port);
});

app.route("/index").get(function(req, res) {
  res.sendfile("./DebugUI/xxx.html");
});

///// FOODS ROUTES \\\\\

app.route("/API/FOODS/RANDOM").get(function(req, res) {
  foodManager.getFirstFood().then(x => res.send(x));
});

app.route("/API/FOODS").post(function(req, res) {
  data = req.body;
  console.log(data);
  foodManager.postFoods(data).then(x => check_results(x, data, res));
});

// TODO COMPLETE
app.route("/API/FOODS/MAJSCORE").get(function(req, res) {
  foodManager.get_foods_with_nutriments().then(x => res.send(x));
  /*foodManager.getFirstFood().then(data => {
    console.log(data);
    foodManager.maj_score(data[16]).then(x => {
      res.send(data[16]);
    });
  });*/
});

///// RECETTES ROUTES \\\\\

app
  .route("/API/RECETTES")
  .post(function(req, res) {
    var title = req.param("title") || res.body.data.title;
    var content = req.param("content") || res.body.data.content;
    var product = req.param("product") || res.body.data.product;
    var image = req.param("image") || res.body.data.image;
    recetteManager
      .postNouvelleRecette(title, content, product, image)
      .then(x => res.send(x));
  })
  .get(function(req, res) {
    var resu = req.param("res") || 10;
    var sort = req.param("sort") || "normal";
    var page = eval(req.param("page")) || "0";
    recetteManager.getRecettes(resu, sort, page).then(x => res.send(x));
  });

app.route("/API/RECETTE/:title").get(function(req, res) {
  var title = req.param("title") || req.params.title || res.body.data.title;
  recetteManager.getRecette(title).then(x => res.send(x));
});

app.route("/API/RECETTES/SEARCH").post(function(req, res) {
  var title = req.param("title") || res.body.data.title;
  recetteManager.getRecettesByTitle(title).then(x => res.send(x));
});

///// STORES ROUTES \\\\\

app.route("/API/STORES/ADD").post(function(req, res) {
  data = req.body;
  console.log(data);
  foodManager.postFoods(data).then(x => test(x, data, res));
});

app.route("/API/image/:id").get(function(req, res) {
  recetteManager.retrieveImage(req.params.id).then(x => {
    if (x == undefined) {
      res.sendStatus(403);
      return;
    }
    res.contentType("png");
    res.write(x);

    // res.sendStatus(200);
    res.end();
    res.connection.end();
    return;
  });
});

app.route("/API/USER/subscribe").post(function(req, res) {
  console.log(req.body.data);
  userManager.subscribe(req.body.data).then(x => {
    console.log(x);
    if (x) {
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });
});

app.route("/API/USER/CONNECT").post(function(req, res) {
  userManager.connect(req.body.data).then(x => {
    if (x) {
      console.log("oui");
      res.sendStatus(200);
      res.send(x.data);
    } else {
      console.log("non");
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

app.route("/API/STORES/GET_STORES_CITY").post(function(req, res) {
  console.log("here");
  data = req.body;
  console.log(data);
  storeManager.get_stores_by_city(data).then(x => res.send(x));
});

app.route("/API/STORES/GET_STORES_CITIES").post(function(req, res) {
  console.log("here");
  data = req.body;
  console.log(data);
  if (data["villes"] != null) {
    
    console.time("6");
    storeManager.get_stores_by_cities(data["villes"]).then(x => {
      res.send({ stores: x });
    });
    // l = [];
    // for (i = 0; i < data["villes"].length; i++) {
    //   storeManager
    //     .get_stores_by_city({
    //       ville: data["villes"][i]
    //     })
    //     .then(x => {
    //       l.push(x);
    //       if (l.length == data["villes"].length) {
    //         console.log(l);
    //         res.send({ stores: l });
    //       }
    //     });
    // }
  } else {
    res.send("Clé manquante : villes");
  }
});

app.route("/API/STORES/GET_STORES_NAME").post(function(req, res) {
  data = req.body;
  console.log(data);
  storeManager.get_stores_by_name(data).then(x => res.send(x));
});

app
  .route("/API/STORES/GET_CITIES")
  .post(function(req, res) {
    data = req.body;
    storeManager.get_cities(data).then(x => check_cities(x, res));
  })
  .get(function(req, res) {
    storeManager.get_cities({ ville: "" }).then(x => check_cities(x, res));
  });

///// PRICES ROUTES \\\\\
app.route("/API/PRICES/ADD").post(function(req, res) {
  data = req.body;
  console.log(data);
  priceManager.add_price(data).then(x => res.send(x));
});

app.route("/API/PRICES").post(function(req, res) {
  data = req.body;
  console.log(data);
  priceManager.get_prices(data).then(x => check_other_crit(res, data, x));
});

function check_other_crit(res, data, x) {
  console.log(x);
  foodManager.get_foods_from_list(data, x).then(y => res.send(y));
}

// Methodes
function check_results(x, data, res) {
  if (x.length == 0) {
    if (data.hasOwnProperty("nom")) {
      str = JSON.stringify(data);
      str = str.replace(/\"nom\":/g, '"mot-cle":');
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

//main page
app.route("/miammiameat").get(function(req, res) {
  res.sendfile(pathClientSide + "/main.html");
});
//resources for main page
app.route("/miammiameat/resources/logo").get(function(req, res) {
  res.sendfile(pathClientSide + "/resources/logo.png");
});

app.route("/miammiameat/resources/header").get(function(req, res) {
  res.sendfile(pathClientSide + "/resources/imgHeader.jpg");
});

app.route("/miammiameat/resources/menu").get(function(req, res) {
  res.sendfile(pathClientSide + "/resources/menu.jpg");
});

app.route("/miammiameat/resources/search").get(function(req, res) {
  res.sendfile(pathClientSide + "/resources/search.jpg");
});

app.route("/miammiameat/resources/defaultIMG").get(function(req, res) {
  res.sendfile(pathClientSide + "/resources/defaultIMG.jpg");
});
