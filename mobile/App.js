import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, View} from "react-native"
import SearchableDropDown from "./src/components/SearchableDropdown"

export default function App() {

  return (
    <View style={styles.container}>
      <SearchableDropDown/>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
