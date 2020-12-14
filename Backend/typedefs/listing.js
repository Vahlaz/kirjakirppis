const Listing = `
    type Listing {
        User: User!
        Price: Float!
        Information: String
        Series: String!
        Title: String!
        Publisher: String!
        Subject: String!
        Condition: Int!
        School: String!
        id: ID!
    }
`

module.exports = Listing
