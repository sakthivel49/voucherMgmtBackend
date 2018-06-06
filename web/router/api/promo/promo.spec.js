let chai = require('chai')
let path = require('path')
let sinon = require('sinon')
let expect = chai.expect

let controller = require('./controller')

describe('Promo', () => {
  it('returns promo code list', () => {
    expect(controller.getPromos()).to.have.length(4)
  })
})
