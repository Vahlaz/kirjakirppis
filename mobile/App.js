import React from "react"
import Main from "./src/components/Main"
import { Provider, DefaultTheme } from "react-native-paper"

const App = () => {

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
    <Provider theme={theme}>
      <Main />
    </Provider>
  )
}


export default App
