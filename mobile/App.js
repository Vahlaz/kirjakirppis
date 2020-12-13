import React from "react"
import Main from "./src/components/Main"
import { Provider, DefaultTheme } from "react-native-paper"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "./src/utils/apolloClient"

const App = () => {

  const apolloClient = createApolloClient()

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
      <Provider theme={theme}>
        <Main />
      </Provider>
    </ApolloProvider>
  )
}


export default App
