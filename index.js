var express = require("express");

// 基本設定
var app = express();
var port = process.env.PORT || 3000;

app.use('./static', express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

// routes

// start server
app.listen(port, () => {
	console.log("Server listen on port " + port);
});