import React, { useEffect } from "react"
import SelectSchoolPage from "./SelectSchoolPage"
import { StatusBar } from "expo-status-bar"
import NavMenu from "./NavMenu"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { useTheme } from "react-native-paper"
import { View } from "./styled"

const Main = () => {

  const { school, setSchool, getSchool } = useSchool()

  const { getUserInfo } = useUserInfo()

  useEffect(() => {
    getSchool()
    getUserInfo()
  }, [])

  const { colors } = useTheme()

  return (
    <View flexGrow backgroundColor={colors.background}>
      {!school ?
        <SelectSchoolPage setSelectedSchool={setSchool} />
        : <NavMenu />
      }
      <StatusBar style="light" ></StatusBar>
    </View>
  )
}

export default Main
