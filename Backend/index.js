const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Test  = require('./test.js')
const Listing = require('./listing.js')

console.log(`${Listing}`)

const typeDefs = gql`
${Test}

${Listing}

type Query{
    test: String!
    Listing(id: ID!): [String!, User!] 

}

`

const resolvers = {
    Query: {
        test: () => {return 'test'}
    }
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
