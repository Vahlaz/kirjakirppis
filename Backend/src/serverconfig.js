const resolvers = require('./resolvers/resolvers.js')
const User = require('./models/UserSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const typeDefs = require('./typedefs/typeDefs')
const JWT_SECRET = process.env.JWT_SECRET
const formatError = require('./formatError')
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
  formatError
}

module.exports = serverConfig
