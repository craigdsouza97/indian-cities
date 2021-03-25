const crypto = require('crypto')
const buildCreateUser = require('./create-user')
const buildLoginUser = require('./login-user')
const createUser = buildCreateUser({ md5 })
const loginUser = buildLoginUser({ md5 })

function md5 (password) {
  return crypto
    .createHash('md5')
    .update(password, 'utf-8')
    .digest('hex')
}

module.exports = Object.freeze({
  loginUser,
  createUser
})
