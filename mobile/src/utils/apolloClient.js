import ApolloClient from "apollo-boost"

const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    uri: "http://127.0.0.1:4000/graphql",
  })
}

export default createApolloClient