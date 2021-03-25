const jwt = require('jsonwebtoken')

function createToken (data) {
  const token = data.token
  const nonToken = data.nonToken
  data = {
    token: jwt.sign(token, process.env.KEY, { expiresIn: '1h' }),
    ...nonToken
  }

  return data
}

module.exports = createToken
