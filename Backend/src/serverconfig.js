const { gql } = require('apollo-server-lambda')

const ListingDef = require('./typedefs/listing.js')
const UserDef = require('./typedefs/User.js')
const TokenDef = require('./typedefs/token.js')
const resolvers = require('./resolvers/resolvers.js')
const User = require('./models/UserSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Test = require('./test.js')

const JWT_SECRET = process.env.JWT_SECRET

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('error connecting to mongodb', error.message)
  })

const typeDefs = gql`
  ${Test}
  ${UserDef}
  ${ListingDef}
  ${TokenDef}

  type Query {
    test: String!
    allUsers: [User]!
    allListings(
      User: ID
      Series: String
      Title: String
      Publisher: String
      Subject: String
      Condition: Int
      School: String
      id: String
    ): [Listing]!
    me: User
  }
  type Mutation {
    createUser(
      name: String!
      phonenumber: String!
      email: String!
      information: String
      password: String!
      school: String
    ): User
    createListing(
      User: ID!
      Price: Float!
      Information: String
      Series: String!
      Title: String!
      Publisher: String!
      Subject: String!
      Condition: Int!
      School: String!
    ): Listing
    login(email: String!, password: String!): Token
  }
`
const serverConfig = {
  typeDefs,
  resolvers,
  context: async ({ event, req }) => {
    let auth
    if (req) {
      auth = req.headers.authorization
    } else if (event) {
      auth = event.headers.Authorization
    }
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
}

module.exports = serverConfig