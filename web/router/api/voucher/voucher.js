const path = require('path'),
  logger = require(path.resolve('.') + '/utils/logger'),
  controller = require('./controller')

let Voucher = function () {
  this.buyVoucher = (req, res) => {
    return controller.buyVoucher(req.body).then((result) => {
      logger.info('web | router | api | voucher | buyVoucher(function) | success')
      res.status(200).json({success: true})
    }).catch((err) => {
      logger.warn('web | router | api | voucher | buyVoucher(function) | Error: ', err)
      return res.status(400).json({success: false, error: {message: err.message}})
    })
  }

  this.getVouchers = (req, res) => {
    res.status(200).json({success: true, payload: controller.getVouchers()})
  }
}

module.exports = new Voucher()
