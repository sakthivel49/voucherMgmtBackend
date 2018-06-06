const path = require('path')
const promoModel = require(path.resolve('.') + '/models/mongodb').promo
const logger = require(path.resolve('.') + '/utils/logger')
const _ = require('lodash')

const availbleCodes = [
  { code: 'ABC100', discountValue: 100, expiry_at: '2018-05-10', title: "Flash Sale: Grab Rs 100 OFF" },
  { code: 'ABC200', discountValue: 200, expiry_at: '2018-06-11', title: "Flash Sale: Grab Rs 200 OFF" },
  { code: 'ABC300', discountValue: 300, expiry_at: '2018-06-12', title: "Flash Sale: Grab Rs 300 OFF" },
  { code: 'ABC400', discountValue: 400, expiry_at: '2018-06-13', title: "Flash Sale: Grab Rs 400 OFF" }
]

let Promo = function () {
  this.applyCode = (data) => {
    let promoCode = validateCode(data.code)
    if (promoCode instanceof Error) {
      return Promise.reject(promoCode)
    } else {
      data.discountValue = promoCode.discountValue
      data.expiry_at = new Date(promoCode.expiry_at)
      return promoModel.create(data)
    }
  }

  this.getPromos = () => {
    return availbleCodes
  }

  function validateCode (code) {
    let result = _.find(availbleCodes, codes => codes.code == code)
    if (result) {
      if (new Date() < new Date(result.expiry_at))
        return result
      else
        return new Error('Code expired')
    } else {
      return new Error('Code not exist')
    }
  }
}
module.exports = new Promo()
