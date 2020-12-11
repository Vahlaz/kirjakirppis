import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Route, Switch, Redirect, useHistory } from "react-router-native"
import SelectSchoolPage from "./SelectSchoolPage"
import NavMenu from "./NavMenu"

const Main = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  })

  const history = useHistory()

  const [selectedSchool, setSelectedSchool] = useState("")

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school)
    history.push("/")
  }

  return (
    <View style={styles.container}>
      {selectedSchool ? <NavMenu /> : null}
      <Switch>
        <Route path="/school">
          <SelectSchoolPage setSelectedSchool={handleSchoolSelect} />
        </Route>
        {!selectedSchool && <Redirect to="/school" />}
        <Route path="/profile">
          <Text>PROFILE PAGE</Text>
        </Route>
        <Route path="/">
          <Text>HOMEPAGE</Text>
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  )
}


export default Main
