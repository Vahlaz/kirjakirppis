import React from "react"
import Main from "./src/components/Main"
import { Provider, DefaultTheme } from "react-native-paper"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "./src/utils/apolloClient"
import UserStorage from "./src/utils/UserStorage"
import UserStorageContext from "./src/contexts/UserStorageContext"

const userStorage = new UserStorage()

const App = () => {

  const apolloClient = createApolloClient(userStorage)

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
      <UserStorageContext.Provider value={userStorage}>
        <Provider theme={theme}>
          <Main />
        </Provider>
      </UserStorageContext.Provider>
    </ApolloProvider>
  )
}


export default App
