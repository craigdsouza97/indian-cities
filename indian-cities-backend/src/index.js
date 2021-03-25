const logger = require('../config/logger')
const controllers = require('./controllers')
const makeCallback = require('./middleware/express-callback')
const verifyToken = require('./middleware/verify-token')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const apiRoot = process.env.DM_BASE_URL

const app = express()
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use((_, res, next) => {
  res.set({ Tk: '!' })
  next()
})

logger.info('Setting up controllers')

// Controls
app.post(`${apiRoot}/users`, makeCallback(controllers.addUserController))
app.post(`${apiRoot}/users/login`, makeCallback(controllers.loginUserController))
app.get(`${apiRoot}/cities`, verifyToken, makeCallback(controllers.listCitiesController))
// End of Controls

app.use(makeCallback(controllers.notFound))

// listen for requests
app.listen(process.env.SERVER_PORT, '127.0.0.1', () => {
  logger.info('Server is listening on port: ' + process.env.SERVER_PORT)
})

module.exports = app
