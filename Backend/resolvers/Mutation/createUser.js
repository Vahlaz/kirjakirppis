const bcrypt = require('bcryptjs')
const User = require('../../models/UserSchema')
const { UserInputError } = require('apollo-server')

const createUser = async (root, args) => {
  const passwordhash = await bcrypt.hash(args.password, 12)
  const user = new User({ ...args, passwordhash: passwordhash })
  console.log(args)
  console.log(user)

  if (!args.username || args.username.length < 3) {
    throw new UserInputError('Käyttäjänimi liian lyhyt')
  }

  if (args.username > 30) {
    throw new UserInputError('Käyttäjänimi liian pitkä (max 30 merkkiä)')
  }

  if (await User.findOne({ username: args.username })) {
    throw new UserInputError('Käyttäjänimi varattu')
  }

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
    await user.save().then(console.log('saved'))
  } catch (error) {
    throw new UserInputError((error) => error.message)
  }
  return user
}

module.exports = createUser
