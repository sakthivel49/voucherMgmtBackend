let mongoose = require('mongoose');
let Schema = mongoose.Schema;
module.exports = function (mongoose) {
	let promoSchema = new mongoose.Schema({
		code: {
			type: String,
			required: true
		},
		expiry_at: {
			type: Date
		},
		discountValue: {
			type: Number
		},
		email: {
			type: String
		},
		phone: {
			type: String
		},
		created_at: {
			type: Date,
			default: Date.now
		}
	});
	return mongoose.model('promos', promoSchema);
};