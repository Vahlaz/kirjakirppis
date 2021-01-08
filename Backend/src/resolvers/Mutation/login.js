const User = require('../../models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UserInputError } = require('apollo-server')

const login = async (root, args) => {
  const username = args.username
  const user = await User.findOne({ username: username })
  const credentialsCorrect =
    user && (await bcrypt.compare(args.password, user.passwordhash))
  if (!credentialsCorrect) {
    throw new UserInputError('Käyttäjänimi tai salasana väärin')
  }
  return {
    token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
    username,
    id: user.id,
  }
}

module.exports = login
