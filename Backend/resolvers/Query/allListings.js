const Listing = require('../../models/ListingSchema.js')

const allListings = async (root, args) => {
    if(args.id) {
       return await Listing.findById(args.id)
    }
    if(args.school){
        return await Listing.find({School: args.school})
    }
    if(args.Series) {
        return await Listing.find({Series: args.Series})
    }
    if(args.Title){
        return await Listing.find({Title: args.Title})
    }
    if(args.Publisher) {
        return await Listing.find({Publisher: args.Publisher})
    }
    if(args.Subject) {
        return await Listing.find({Subject: Subject})
    }
}
