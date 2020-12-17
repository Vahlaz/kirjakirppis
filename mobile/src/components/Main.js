import React from "react"
import { View } from "react-native"
import SelectSchoolPage from "./SelectSchoolPage"
import NavMenu from "./NavMenu"
import useSchool from "../hooks/useSchool"
import { withTheme, Headline } from "react-native-paper"

const Main = ({ theme }) => {

  const [school, setSchool] = useSchool()

  return (
    <View style={{ flex: 1 }} >
      <View style={{ height: 100, backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center"}}>
        <Headline style={{ color: "white" }} >Kirjakirppis</Headline>
      </View>
      {!school ?
        <SelectSchoolPage setSelectedSchool={setSchool} />
        : <NavMenu />
      }
    </View>
  )
}


export default withTheme(Main)
