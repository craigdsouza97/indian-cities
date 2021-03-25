const makeUserDB = require('./user-db')
const userSchemaModel = require('../../schema-models/user-schema')
function getUserDBProperties (mongoose, logger) {
  var userSchema = new mongoose.Schema(userSchemaModel)

  const UserModel = mongoose.model('users', userSchema, 'users')
  return makeUserDB({ UserModel }, logger)
}

module.exports = getUserDBProperties
