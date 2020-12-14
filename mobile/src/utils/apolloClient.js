import ApolloClient from "apollo-boost"

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken()
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    uri: "http://127.0.0.1:4000/graphql",
  })
}

export default createApolloClient