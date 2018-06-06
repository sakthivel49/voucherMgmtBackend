let chai = require('chai')
let path = require('path')
let sinon = require('sinon')
let expect = chai.expect

let controller = require('./controller')

describe('Voucher', () => {
  it('returns voucher list', () => {
    expect(controller.getVouchers()).to.have.length(5)
  })
})
