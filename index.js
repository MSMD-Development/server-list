var express = require("express");
var mongoose = require("mongoose");
var config = require("./config.json");

// 基本設定
mongoose.connect(config.db_host, config.db_database, {
	user: config.db_user,
	pass: config.db_pw
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Database connected.");
});


var app = express();
var port = process.env.PORT || 3000;

app.use('./static', express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

// routes
var r_main = require("./router/main");
app.use('/', r_main);

// start server
app.listen(port, () => {
	console.log("Server listen on port " + port);
});