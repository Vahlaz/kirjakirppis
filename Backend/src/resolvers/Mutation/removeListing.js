const { AuthenticationError } = require('apollo-server')
const Listing = require('../../models/ListingSchema')

const removeListing = async (root, args, context) => {
  const user = context.currentUser.id
  const listingId = args.id

  const foundListing = await Listing.findById(listingId).catch((error) => {
    throw new Error('Ilmoitus id väärin')
  })

  const foundListingid = `${foundListing._id}`
  const foundListingUser = `${foundListing.User}`
  if (foundListingUser === user) {
    try {
      await Listing.findByIdAndRemove(foundListingid)
      return foundListingid
    } catch (error) {
      throw new Error(error.message)
    }
  } else {
    throw new AuthenticationError('Väärä käyttäjä')
  }
}

module.exports = removeListing
