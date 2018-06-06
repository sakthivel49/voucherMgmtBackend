'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const logger = require('../utils/logger')
const path = require('path')
const router = require('./router')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

// Secure Express app by setting various HTTP headers
app.use(helmet())
// Body-parser (To parse the request body)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

/**
    Add to avoid cross origin access.
    Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
    By setting domain name to some value, the API access can be restricted to only the mentioned domain.
    Eg, Access-Control-Allow-Origin: 'mywebsite.com'
*/
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'x-access-token,Content-Type')
  res.header('Access-Control-Expose-Headers', 'x-access-token,Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  next()
})

// Set the port no
app.set('port', process.env.PORT || 4001)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router)

app.use('/', function (err, req, res, next) {
  err.status = 400
  logger.error('index | Error: ', err)
  res.status(err.status || 400).json({ success: false, error: { message: 'Server Error' } })
})
app.use(function (req, res) {
  let err = new Error('URL Not Found')
  err.status = 404
  logger.error('index | Invalid Url', req.url)
  res.status(err.status || 404).json({ success: false, error: { message: "URL '" + req.url + "' with method '" + req.method + "' not exist" } })
})
app.listen(app.get('port'))
logger.info('Server Running on port no: ' + app.get('port'))

process.on('uncaughtException', function (err) {
  logger.info('index | uncaughtException, Error: ', err)
  process.exit(1)
})
