const router = require('express').Router()
const api = require('./api')
const middleware = require('./middleware')

router.get('/promo', api.promo.promo.getPromos)
router.post('/promo', middleware.promo.applyCode, api.promo.promo.applyCode)

router.get('/voucher', api.voucher.voucher.getVouchers)
router.post('/voucher', middleware.voucher.buyVoucher, api.voucher.voucher.buyVoucher)

module.exports = router
