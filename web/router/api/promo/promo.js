const path = require('path'),
  logger = require(path.resolve('.') + '/utils/logger'),
  controller = require('./controller')

let Promo = function () {
  this.applyCode = (req, res) => {
    return controller.applyCode(req.body).then((result) => {
      logger.info('web | router | api | promo | applyCode(function) | success')
      res.status(200).json({success: true})
    }).catch((err) => {
      logger.warn('web | router | api | promo | applyCode(function) | Error: ', err)
      return res.status(400).json({success: false, error: {message: err.message}})
    })
  }

  this.getPromos = (req, res) => {
    res.status(200).json({success: true, payload: controller.getPromos()})
  }
}

module.exports = new Promo()
