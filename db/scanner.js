var server = require("./schema");
var gamedig = require("gamedig");

scan = () => {
	console.log("掃描伺服器...");
	server.find((err, servers) => {
		servers.forEach((value, index, array) => {
			// console.log(value);
			gamedig.query({
				type: 'minecraftping',
				host: value.host
			}).then((state) => {
				//console.log(state)
				server.update({
					_id: value._id
				}, {
					ver: state.raw.version,
					online: true,
					players: state.players.length,
					maxplayers: state.maxplayers,
					description: state.raw.description
				}, () => {
					// console.log("OK" + Date.now());
				});
			}).catch((err) => {
				server.update({
					_id: value._id
				}, {
					online: false
				}, () => {
					// console.log("ERR" + Date.now());
				});
			});
		});
	});
};

module.exports = scan;