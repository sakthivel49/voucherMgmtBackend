const path = require('path'),
  logger = require(path.resolve('.') + '/utils/logger'),
  validator = require('joi')

exports.buyVoucher = function (req, res, next) {
  logger.info('web | middleware | voucher | buyVoucher')
  let schema = validator.object().keys({
    vouchertype: validator.string().required(),
    voucherid: validator.string().required()
  })
  validator.validate(req.body, schema, {abortEarly: false, allowUnknown: true}, function (err) {
    if (err) {
      logger.warn('web | middleware | voucher | buyVoucher | validation error: ', err)
      res.status(400).json({success: false, error: err})
    }
    else
      next()
  })
}
