const ListingSearch = (listings, search) => {
    if (search) {
        const searchedListings = listings.filter((listing) => listing.Title === search.title)
        if (searchedListings) return searchedListings
        else return []
    }
    return listings
}

export default ListingSearch