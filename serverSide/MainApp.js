const express = require("express");
const foodManager = require("./app_modules/foodManager");
const recetteManager = require("./app_modules/recetteManager");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
// var multer = require('multer');
// var multerData = multer();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/clientSide"));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

server.listen(port, function () {
  console.log('Server listening on port '+ port);
});

app.route("/index").get(function(req, res) {
  res.sendfile("./DebugUI/xxx.html");
});

app.route("/API/FOODS/RANDOM").get(function(req, res) {
  foodManager.getFirstFood().then(x => res.send(x));
});

app.route("/API/RECETTES").post(function(req, res) {
  var title = req.param("title");
  var content  = req.param("content");
  var name  = req.param("name");
  recetteManager.postNouvelleRecette(title, content, name).then(x => res.send(x))
}).get(function(req, res) {
  var resu = req.param("res") || 10;
  var sort  = req.param("sort") || "normal";
  var page  = eval(req.param("page")) || "0";
  recetteManager.getRecettes(resu, sort, page).then(x => res.send(x))
});
