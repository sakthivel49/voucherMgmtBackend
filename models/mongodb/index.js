let mongoose = require('./connection');

module.exports = {
    promo: require('./schema/promo')(mongoose),
	voucher: require('./schema/voucher')(mongoose),
}
