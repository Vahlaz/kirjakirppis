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
      primary: "#212121",
      accent: "#7f0000",
      background: "#484848",
      surface: "#484848",
      text: "#FFFFFF",
      placeholder: "#FFFFFF"
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
