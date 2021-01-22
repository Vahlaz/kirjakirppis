const createListing = `
    createListing(
    User: ID!
    Price: Float!
    Information: String
    Series: String!
    Title: String!
    Publisher: String!
    Subjects: [String]!
    Condition: Int!
    School: String!
  ): Listing
`
module.exports = createListing
