const Listing = require('../../models/ListingSchema.js')

const allListings = async (root, args) => {
    if(args){
        return await Listing.find({...args})
    }
    return Listing.find({})
}

module.exports = allListings