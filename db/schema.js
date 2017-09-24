var mongoose = require("mongoose");
var mongooseUniqueValidator = require("mongoose-unique-validator");

var serverSchema = new mongoose.Schema({
	name: { type: String, required: true },
	host: { type: String, required: true, unique: true },
	ver: { type: String, required: true },
	online: { type: Boolean, required: true },
	lastCheck: { type: Date, default: Date.now }
});

serverSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('server', serverSchema);