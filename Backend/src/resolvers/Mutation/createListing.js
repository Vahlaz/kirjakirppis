const User = require('../../models/UserSchema')
const Listing = require('../../models/ListingSchema')
const { UserInputError, AuthenticationError } = require('apollo-server')

const createListing = async (root, args, context) => {

  if (!context.currentUser) {
    throw new AuthenticationError('Käyttäjä ei ole kirjautunut')
  }
  if (context.currentUser.id !== args.User) {
    throw new AuthenticationError('Käyttäjä ei ole sama kuin tokenin omistaja.')
  }

  const listingUser = await User.findById(args.User)
  const newListing = new Listing({ ...args, User: listingUser })
  try {
    newListing.save()
  } catch {
    throw new UserInputError((error) => error.message)
  }
  return newListing
}

module.exports = createListing
