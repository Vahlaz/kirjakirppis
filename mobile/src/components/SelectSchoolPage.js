import React from "react"
import { View, Text } from "react-native"
import SearchableDropDown from "./SearchableDropdown"
import schools from "../assets/schools.json"

const SelectSchoolPage = ({ setSelectedSchool }) => {

  return (
    <View>
      < Text > Valitse koulu</Text >
      <SearchableDropDown items={schools} fieldToSearch="name" onSelected={(school) => setSelectedSchool(school)} />
    </View>
  )
}

export default SelectSchoolPage