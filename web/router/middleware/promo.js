const path = require('path'),
  logger = require(path.resolve('.') + '/utils/logger'),
  validator = require('joi')

exports.applyCode = function (req, res, next) {
  logger.info('web | middleware | promo | applyCode')
  let schema = validator.object().keys({
    code: validator.string().required(),
    email: validator.string().required(),
    phone: validator.string().required()
  })
  validator.validate(req.body, schema, {abortEarly: false, allowUnknown: true}, function (err) {
    if (err) {
      logger.warn('web | middleware | promo | applyCode | validation error: ', err)
      res.status(400).json({success: false, error: err})
    }
    else
      next()
  })
}
