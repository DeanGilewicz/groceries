const mongoose = require('../db/mongoose').mongoose;

var itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	type: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	threshold: {
		type: Number,
		required: true,
		default: null
	},
	quantity: {
		type: Number,
		required: true,
		default: null
	},
	// remaining: {
	// 	type: Number,
	// 	default: null
	// },
	replenish: {
		type: Boolean,
		required: true,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

var Item = mongoose.model('Item', itemSchema);


module.exports = {Item: Item};