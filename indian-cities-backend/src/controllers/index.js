const notFound = require('./not-found')
const createUser = require('./create-user')
const loginUser = require('./login-user')
const listCities = require('./list-cities')
const logger = require('../../config/logger')

const userDB = require('../data-access/index').userDB
const cityDB = require('../data-access/index').cityDB

const userEntity = require('../entity/').user
const createToken = require('../util/createToken')

const addUserController = createUser(userDB.addUser, userEntity.createUser, createToken, logger)
const loginUserController = loginUser(userDB.loginUser, userEntity.loginUser, createToken, logger)
const listCitiesController = listCities(cityDB.listCities, logger)
module.exports = Object.freeze({
  addUserController,
  loginUserController,
  listCitiesController,
  notFound
})
