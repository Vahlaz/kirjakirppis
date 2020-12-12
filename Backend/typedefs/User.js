const User = `
    type User {
        name: String!
        username: String!
        phonenumber: String!
        email: String!
        listings: [Listing]!
        information: String
        passwordhash: String!
        id:ID!
    }
`

module.exports = User