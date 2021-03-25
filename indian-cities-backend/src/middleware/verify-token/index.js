const jwt = require('jsonwebtoken')
const logger = require('../../../config/logger')

module.exports = function verifyToken (req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token')
      } else {
        req.params.userID = decoded._id
        req.body.email = decoded.email
        logger.info('Token for ' + decoded.email + ' has been verified')
        next()
      }
    })
  } else {
    res.status(401).send('No token provided')
  }
}
