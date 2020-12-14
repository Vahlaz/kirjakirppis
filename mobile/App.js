import React from "react"
import Main from "./src/components/Main"
import { Provider, DefaultTheme } from "react-native-paper"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "./src/utils/apolloClient"
import AuthStorage from "./src/utils/authStorage"
import AuthStorageContext from "./src/contexts/AuthStorageContext"

const authStorage = new AuthStorage()

const App = () => {

  const apolloClient = createApolloClient(authStorage)

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FF00B6",
      accent: "#8903FF",
    },
  }

  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Provider theme={theme}>
          <Main />
        </Provider>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  )
}


export default App
