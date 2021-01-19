import React, { useState } from "react"
import Main from "./src/components/Main"
import { LogBox } from "react-native"
import { Provider, DarkTheme as PaperTheme } from "react-native-paper"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "./src/utils/apolloClient"
import UserStorage from "./src/utils/UserStorage"
import UserStorageContext from "./src/contexts/UserStorageContext"
import { NavigationContainer, DarkTheme as NavigationTheme } from "@react-navigation/native"

const userStorage = new UserStorage()

const App = () => {

  LogBox.ignoreLogs(["The global \"__expo\" and \"Expo\" objects will be removed in SDK 41"])

  const apolloClient = createApolloClient(userStorage)

  const DefaultTheme = {
    ...PaperTheme,
    ...NavigationTheme,
    colors: {
      ...PaperTheme.colors,
      ...NavigationTheme.colors,
    },
  }

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
          <NavigationContainer theme={theme}>
            <Main/>
          </NavigationContainer>
        </Provider>
      </UserStorageContext.Provider>
    </ApolloProvider>
  )
}


export default App
