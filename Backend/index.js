const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Test = require('./test.js')
const ListingDef = require('./typedefs/listing.js')
const UserDef = require('./typedefs/User.js')
const TokenDef = require('./typedefs/token.js')
const resolvers = require('./resolvers/resolvers.js')
const User = require('./models/UserSchema')

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
    Listing(id: ID!): Listing!
    allUsers: [User]!
  }
  type Mutation {
    createUser(
      name: String!
      username: String!
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
      Condition: String!
    ): Listing
    login(username: String!, password: String!): Token
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
