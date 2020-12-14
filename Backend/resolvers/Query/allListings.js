const Listing = require('../../models/ListingSchema.js')

const allListings = async (root, args) => {
  console.log('listings queried')
  if (args) {
    return await Listing.find({ ...args }).populate('User')
  }
  return await Listing.find({})
}

module.exports = allListings
