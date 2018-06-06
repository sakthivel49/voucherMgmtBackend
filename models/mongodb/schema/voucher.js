let mongoose = require('mongoose')
let Schema = mongoose.Schema
module.exports = function (mongoose) {
  let voucherSchema = new mongoose.Schema({
    vouchertype: {
      type: String,
      required: true
    },
    voucherid: {
      type: String
    },
    price: {
      type: Number
    },
    quantity: {
      type: Number
    },
    sender: {
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      }
    },
    receiver: {
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      }
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  })
  return mongoose.model('vouchers', voucherSchema)
}
