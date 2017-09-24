var express = require("express");
var router = express.Router();
var server = require("./../db/schema");
var gamedig = require("gamedig");

router.route('/')
	.get((req, res) => {
		server.find((err, servers) => {
			res.render('index', { server: servers });
		});
	})
	.post((req, res) => {
		var s = new server({
			name: req.body.name,
			host: req.body.host,
			ver: '0',
			online: false,
			players: 0,
			maxplayers: 0,
			description: ' '
		});
		s.save((err, server) => {
			if (err)
				res.send(err);
			else
				res.redirect('/');
		});
	});

module.exports = router;