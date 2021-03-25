function makeLoginUser (loginUser, makeLoginUser, createToken, logger) {
  return async (httpRequest) => {
    try {
      const { ...userInfo } = httpRequest.body

      logger.info('Verifying user with Email: ' + httpRequest.body.email)

      let result = await loginUser(makeLoginUser({ ...userInfo }))

      logger.info(result)

      result = createToken(result)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: { ...result }
      }
    } catch (e) {
      logger.warn(e.message)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          error: 'Invalid Email-ID or Password'
        }
      }
    }
  }
}
module.exports = makeLoginUser
