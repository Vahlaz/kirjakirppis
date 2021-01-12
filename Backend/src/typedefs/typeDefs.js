const { gql } = require('apollo-server')
const requireDir = require('require-dir')
const types = requireDir('./types')
const queries = requireDir('./queries')
const mutations = requireDir('./mutations')

const typeDefs = gql`
  ${types.listing}
  ${types.token}
  ${types.User}

  type Query {
    ${queries.allListings}
    ${queries.allUsers}
    ${queries.me}
    ${queries.test}
  }
  type Mutation {
    ${mutations.createListing}
    ${mutations.createUser}
    ${mutations.login}
    ${mutations.removeListing}
  }
`

module.exports = typeDefs
