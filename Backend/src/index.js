const { ApolloServer } = require('apollo-server-lambda')
require('dotenv').config()
const serverConfig = require('./serverconfig.js')

const server = new ApolloServer(serverConfig)

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
