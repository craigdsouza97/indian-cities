const getUserDBProperties = require('./user')
const getCityDBProperties = require('./city')
const mongoose = require('mongoose')
const logger = require('../../config/logger')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(process.env.DB_URL)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.warn(err.message))

const userDB = getUserDBProperties(mongoose, logger)
const cityDB = getCityDBProperties(mongoose, logger)

module.exports = Object.freeze({
  userDB,
  cityDB
})
