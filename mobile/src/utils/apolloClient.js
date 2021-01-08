import ApolloClient from "apollo-boost"
//import { Platform } from "react-native"

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
    uri: "https://nhc02zvzbj.execute-api.eu-central-1.amazonaws.com/dev/graphql" //`http://${Platform.OS === "web" ? "127.0.0.1" : "10.0.2.2"}:4000/graphql`,
  })
}

export default createApolloClient