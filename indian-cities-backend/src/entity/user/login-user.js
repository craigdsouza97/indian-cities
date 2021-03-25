function buildLoginUser ({ md5 }) {
  return function loginUser ({
    email = '',
    password = ''
  } = {}) {
    if (!email) {
      throw new Error('User must have an email-id.')
    }
    if (!password || password.length < 8) {
      throw new Error('Users password must be at least 8 characters long.')
    }
    password = makeHashPassword()
    return Object.freeze({
      email,
      password
    })

    function makeHashPassword () {
      return md5(
        password
      )
    }
  }
}
module.exports = buildLoginUser
