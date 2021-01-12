const bcrypt = require('bcryptjs')
const User = require('../../models/UserSchema')
const { UserInputError } = require('apollo-server')

const createUser = async (root, args) => {
  const passwordhash = await bcrypt.hash(args.password, 12)
  const user = new User({ ...args, passwordhash: passwordhash })
  console.log(args)
  console.log(user)

  if (!args.email || (await User.findOne({ email: args.email }))) {
    throw new UserInputError('Sähköposti varattu')
  }

  if (!args.password || args.password.length < 3) {
    throw new UserInputError('salasana on liian lyhyt')
  }

  if (!args.password > 40) {
    throw new UserInputError('salasana on liian pitkä')
  }

  try {
    await user.save()
  } catch (error) {
    throw new UserInputError(error.message)
  }
  return user
}

module.exports = createUser
