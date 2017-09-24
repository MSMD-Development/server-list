var express = require("express");
var router = express.Router();
var server = require("./../db/schema");

router.get('/', (req, res) => {
	server.find((err, servers) => {
		res.render('index', { server: servers });
	});
});

module.exports = router;