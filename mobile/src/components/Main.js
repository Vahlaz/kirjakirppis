import React, { useState } from "react"
import { View } from "react-native"
import SelectSchoolPage from "./SelectSchoolPage"
import NavMenu from "./NavMenu"

const Main = () => {

  const [selectedSchool, setSelectedSchool] = useState("")

  return (
    <>
      {!selectedSchool ?
        <SelectSchoolPage setSelectedSchool={setSelectedSchool} />
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
