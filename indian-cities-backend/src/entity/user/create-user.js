function buildCreateUser ({ md5 }) {
  return function createUser ({
    firstName = '',
    lastName = '',
    email = '',
    password = ''
  } = {}) {
    if (!firstName) {
      throw new Error('User must have an name.')
    }
    if (!lastName) {
      throw new Error('User must have an name.')
    }
    if (firstName.length < 2) {
      throw new Error('User\'s name must be longer than 2 characters.')
    }
    if (lastName.length < 2) {
      throw new Error('User\'s name must be longer than 2 characters.')
    }
    if (!email) {
      throw new Error('User must have an email-id.')
    }
    if (!password || password.length < 8) {
      throw new Error('User password must be at least 8 characters long.')
    }
    password = makeHashPassword()

    return Object.freeze({
      firstName,
      lastName,
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
module.exports = buildCreateUser
