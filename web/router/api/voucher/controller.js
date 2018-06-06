const path = require('path')
const voucherModel = require(path.resolve('.') + '/models/mongodb').voucher
const logger = require(path.resolve('.') + '/utils/logger')
const _ = require('lodash')

const availbleVouchers = [
  { vouchertype: 'voucher', voucherid: 'gold', title: 'Gold', description: 'First Booking Voucher worth ₹ 600 and Service Voucher worth ₹ 100 Second Booking Voucher worth ₹ 199 and Service Voucher worth ₹ 100' },
  { vouchertype: 'voucher', voucherid: 'silver',  title: 'Silver', description: 'First Booking Voucher worth ₹ 600 and Service Voucher worth ₹ 100 Second Booking Voucher worth ₹ 199 and Service Voucher worth ₹ 100'},
  { vouchertype: 'gift_voucher', voucherid: 'birthday',  title: 'Birthday', description: 'First Booking Voucher worth ₹ 600 and Service Voucher worth ₹ 100 Second Booking Voucher worth ₹ 199 and Service Voucher worth ₹ 100'},
  { vouchertype: 'gift_voucher', voucherid: 'newyear',  title: 'New Year', description: 'First Booking Voucher worth ₹ 600 and Service Voucher worth ₹ 100 Second Booking Voucher worth ₹ 199 and Service Voucher worth ₹ 100'},
  { vouchertype: 'gift_voucher', voucherid: 'anniversary',  title: 'Anniversary', description: 'First Booking Voucher worth ₹ 600 and Service Voucher worth ₹ 100 Second Booking Voucher worth ₹ 199 and Service Voucher worth ₹ 100'}
]

let Voucher = function () {
  this.buyVoucher = (data) => {
    let voucher = validateVoucher(data)
    if (voucher instanceof Error) {
      return Promise.reject(voucher)
    } else {
      return voucherModel.create(data)
    }
  }

  this.getVouchers = () => {
    return availbleVouchers
  }

  function validateVoucher (data) {
    let result = _.find(availbleVouchers ,
      vouchers => vouchers.vouchertype == data.vouchertype &&
        vouchers.voucherid == data.voucherid)
    if (result) {
      return result
    } else {
      return new Error('Voucher not exist')
    }
  }
}
module.exports = new Voucher()
