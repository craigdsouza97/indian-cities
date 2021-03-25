function makeAddUser (addUserToDB, createUser, createToken, logger) {
  return async function addUser (httpRequest) {
    try {
      const parameters = {
        userID: httpRequest.params.userID,
        body: httpRequest.body
      }
      logger.info('In Create User Controller')
      logger.info('Parameters given:')

      if (parameters.body.password !== undefined) {
        let password = parameters.body.password
        delete parameters.body.password
        delete parameters.body.confirmPassword
        logger.info(parameters)
        parameters.body.password = password
      } else logger.info(parameters)

      let result = await addUserToDB(createUser({
        ...parameters.body, userID: parameters.userID
      }))
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
          error: e.message
        }
      }
    }
  }
}
module.exports = makeAddUser
