const express = require("express");
const foodManager = require("./app_modules/foodManager");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
// var multer = require('multer');
// var multerData = multer();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/clientSide"));
const pathClientSide = __dirname.substring(0, __dirname.length - 10)+"clientSide";

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

server.listen(port, function () {
  console.log('Server listening on port '+port);
});

app.route("/index").get(function(req, res) {
  res.sendfile("./DebugUI/xxx.html");
});

app.route("/API/FOODS/RANDOM").get(function(req, res) {
  foodManager.getFirstFood().then(x => res.send(x));
});

app.route("/API/FOODS").post(function(req, res) {
  foodManager.postFoods(req).then(x => res.send(x));
})
//main page
app.route("/miammiameat").get(function(req, res) {
  res.sendfile(pathClientSide+"/main.html");
});

//resources for main page
app.route("/miammiameat/resources/logo").get(function(req, res) {
  res.sendfile(pathClientSide+"/resources/logo.png");
});
app.route("/miammiameat/resources/header").get(function(req, res) {
  res.sendfile(pathClientSide+"/resources/imgHeader.jpg");
});
app.route("/miammiameat/resources/menu").get(function(req, res) {
  res.sendfile(pathClientSide+"/resources/menu.jpg");
});
app.route("/miammiameat/resources/search").get(function(req, res) {
  res.sendfile(pathClientSide+"/resources/search.jpg");
});
app.route("/miammiameat/resources/defaultIMG").get(function(req, res) {
  res.sendfile(pathClientSide+"/resources/defaultIMG.jpg");
});
