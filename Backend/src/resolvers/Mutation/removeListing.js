const { AuthenticationError } = require('apollo-server')
const Listing = require('../../models/ListingSchema')

const removeListing = async (root, args, context) => {
  const user = context.currentUser
  const listing = { ...args }
  const listingId = args.id
  if (listing.User === user.id) {
    try {
      await Listing.findByIdAndRemove( listingId )
      return listing.id
    } catch (error) {
      throw new Error(error.message)
    }
  } else {
    throw new AuthenticationError('Väärä käyttäjä')
  }
}

module.exports = removeListing
