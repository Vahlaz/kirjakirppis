import React from "react"
import { View } from "react-native"
import SelectSchoolPage from "./SelectSchoolPage"
import NavMenu from "./NavMenu"
import useSchool from "../hooks/useSchool"

const Main = () => {

  const [school, setSchool] = useSchool()

  return (
    <>
      {!school ?
        <SelectSchoolPage setSelectedSchool={setSchool} />
        : <>
          <View style={{ flex: 1 }} >
            <NavMenu />
          </View>
        </>
      }
    </>
  )
}


export default Main
