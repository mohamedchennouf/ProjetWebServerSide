const express = require("express");
const foodManager = require("./app_modules/foodManager");
const recetteManager = require("./app_modules/recetteManager");
const storeManager = require("./app_modules/storeManager");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
// var multer = require('multer');
// var multerData = multer();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/clientSide"));
const pathClientSide = __dirname.substring(0, __dirname.length - 10) + "clientSide";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

server.listen(port, function () {
  console.log('Server listening on port ' + port);
});

app.route("/index").get(function (req, res) {
  res.sendfile("./DebugUI/xxx.html");
});

app.route("/API/FOODS/RANDOM").get(function (req, res) {
  foodManager.getFirstFood().then(x => res.send(x));
});

app.route("/API/RECETTES").post(function (req, res) {
  var title = req.param("title");
  var content = req.param("content");
  var name = req.param("name");
  recetteManager.postNouvelleRecette(title, content, name).then(x => res.send(x))
}).get(function (req, res) {
  var resu = req.param("res") || 10;
  var sort = req.param("sort") || "normal";
  var page = eval(req.param("page")) || "0";
  recetteManager.getRecettes(resu, sort, page).then(x => res.send(x))
});

app.route("/API/FOODS").post(function (req, res) {
  data = JSON.parse(Object.keys(req.body)[0]);
  console.log(data);
  foodManager.postFoods(data).then(x => check_results(x, data, res));
})

app.route("/API/STORES/ADDTEST").post(function (req, res) {
  data = JSON.parse(Object.keys(req.body)[0]);
  console.log(data);
  storeManager.postFoods(data).then(x => check_results(x, data, res));
})

app.route("/API/FOODS/MAJSCORE").get(function (req, res) {
  foodManager.get_all_foods().then(data => {
    foodManager.maj_custom_score(data);
    res.send("OK");
  });
});

function check_results(x, data, res) {
  if (x.length == 0) {
    if (data.hasOwnProperty('nom')) {
      str = JSON.stringify(data);
      str = str.replace(/\"nom\":/g, "\"mot-cle\":");
      json = JSON.parse(str);
      foodManager.postFoods(json).then(x => res.send(x));
    }
    else {
      res.send(x);
    }
  }
  else {
    res.send(x);
  }
}

//main page
app.route("/miammiameat").get(function (req, res) {
  res.sendfile(pathClientSide + "/main.html");
});

//resources for main page
app.route("/miammiameat/resources/logo").get(function (req, res) {
  res.sendfile(pathClientSide + "/resources/logo.png");
});
app.route("/miammiameat/resources/header").get(function (req, res) {
  res.sendfile(pathClientSide + "/resources/imgHeader.jpg");
});
app.route("/miammiameat/resources/menu").get(function (req, res) {
  res.sendfile(pathClientSide + "/resources/menu.jpg");
});
app.route("/miammiameat/resources/search").get(function (req, res) {
  res.sendfile(pathClientSide + "/resources/search.jpg");
});
app.route("/miammiameat/resources/defaultIMG").get(function (req, res) {
  res.sendfile(pathClientSide + "/resources/defaultIMG.jpg");
});
