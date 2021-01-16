import React, { useEffect } from "react"
import SelectSchoolPage from "./SelectSchoolPage"
import NavMenu from "./NavMenu"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { useTheme, Headline } from "react-native-paper"
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
      <View centerx height={80} centery backgroundColor={colors.primary}>
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
