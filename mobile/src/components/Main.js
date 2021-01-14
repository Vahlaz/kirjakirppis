import React, { useEffect } from "react"
import { View } from "react-native"
import SelectSchoolPage from "./SelectSchoolPage"
import NavMenu from "./NavMenu"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { useTheme, Headline } from "react-native-paper"

const Main = () => {

  const { school, setSchool, getSchool } = useSchool()

  const { getUserInfo } = useUserInfo()

  useEffect(() => {
    getSchool()
    getUserInfo()
  }, [])

  const { colors } = useTheme()


  return (
    <View style={{ flex: 1, backgroundColor: colors.background }} >
      <View style={{ height: 80, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
        <Headline>Kirjakirppis</Headline>
      </View>
      {!school ?
        <SelectSchoolPage setSelectedSchool={setSchool} />
        : <NavMenu />
      }
    </View>
  )
}

export default Main
