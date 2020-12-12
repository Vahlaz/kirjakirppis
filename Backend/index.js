const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const Test = require('./test.js')
const Listing = require('./typedefs/listing.js')
const User = require('./typedefs/User.js')
const dbListing = require('./models/ListingSchema')

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
  ${User}
  ${Listing}

  type Query {
    test: String!
    Listing(id: ID!): Listing!
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
      User: User!
      Price: String!
      Information: String
      Series: String!
      Title: String!
      Publisher: String!
      Subject: String!
      Condition: String!
    ): Listing
  }
`

const resolvers = {
  Query: {
    test: () => {
      return 'test'
    },
    Listing: (root, args) => {
      if (args.id) {
        const foundListing = mongoListing.findById(id).catch((error) => {
          throw new UserInputError(error.message)
        })
        return foundListing
      }
    },
  },
  Mutation: {
    createListing: (root, args) => {},
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
