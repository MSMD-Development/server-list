var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config.json");
var scanner = require("./db/scanner");

// 基本設定
mongoose.connect(config.db_host, config.db_database, {
	user: config.db_user,
	pass: config.db_pw
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Database connected.");
	scanner();
});

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
var r_main = require("./router/main");
app.use('/', r_main);

// start server
app.listen(port, () => {
	console.log("Server listen on port " + port);
	setInterval(scanner, 10000);
});