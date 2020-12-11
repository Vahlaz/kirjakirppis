const Listing = `
type Listing {
    User: User!
    Price: Int!
    Information: String
    Series: String!
    Title: String!
    Publisher: String!
    Subject: String!
    Condition: String! 
    id: ID!
}
`

module.exports = Listing
