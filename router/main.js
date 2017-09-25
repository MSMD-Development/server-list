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

router.route('/:id')
	.get((req, res) => {
		server.findOne({
			_id: req.params.id
		}, (err, info) => {
			gamedig.query({
				type: 'minecraftping',
				host: info.host
			}).then((state) => {
				console.log(state)
				console.log(state.players[0])
				res.render('svInfo', {
					online: true,
					server: info,
					state: state
				})
			}).catch((err) => {
				res.render('svInfo', {
					online: false,
					server: info,
					state: err
				})
			});
		})
	})

module.exports = router;