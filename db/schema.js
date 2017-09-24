var mongoose = require("mongoose");
var mongooseUniqueValidator = require("mongoose-unique-validator");

var serverSchema = new mongoose.Schema({
	name: { type: String, required: true },
	host: { type: String, required: true, unique: true },
	ver: { type: String, required: true },
	online: { type: Boolean, required: true },
	players: { type: Number, required: true },
	maxplayers: { type: Number, required: true },
	description: { type: String, required: true }
}, {
	collection: "servers"
});

serverSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('server', serverSchema);