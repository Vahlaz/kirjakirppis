const Listing = `
type LISTING(id: ID!) {
    User: User!
    Price: Number!
    Information: String
    Series: String!
    Title: String!
    Publisher: String!
    Subject: String!
    Condition: String! 
    id: ID!
}
`,

module.exports = Listing
