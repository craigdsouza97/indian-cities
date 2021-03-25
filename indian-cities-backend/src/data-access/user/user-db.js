function makeUserDB ({ UserModel }, logger) {
  return Object.freeze({
    addUser,
    loginUser
  })

  async function addUser ({ ...userInfo }) {
    const user = new UserModel(userInfo)
    if (await UserModel.findOne({ email: userInfo.email }).lean() !== null) throw new Error('User with this Email-ID already exists')
    const result = await user.save()
    if ('_id' in result) {
      logger.info('User has been created with id: ' + result._id)
      return {
        token: {
          _id: result._id,
          email: result.email
        },
        nonToken: {
          name: result.firstName
        }
      }
    } else throw new Error('Unable to create user, please try again')
  }

  async function loginUser (userInfo) {
    logger.info('Validating User with Email ID: ' + userInfo.email)
    const result = await UserModel.findOne({ email: userInfo.email, password: userInfo.password }).select('_id email firstName').lean()
    if (result !== null) {
      return {
        token: {
          _id: result._id,
          email: result.email
        },
        nonToken: {
          name: result.firstName
        }
      }
    } else throw new Error('Invalid Username or Password')
  }
}
module.exports = makeUserDB
