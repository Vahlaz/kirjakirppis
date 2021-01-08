const { ApolloServer } = require('apollo-server')
const serverConfig = require('./serverconfig')

const server = new ApolloServer(serverConfig)

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
