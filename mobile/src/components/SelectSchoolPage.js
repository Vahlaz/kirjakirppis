import React from "react"
import { View } from "react-native"
import SearchableDropDown from "./SearchableDropdown"
import schools from "../assets/schools.json"
import { Title } from "react-native-paper"

const SelectSchoolPage = ({ setSelectedSchool }) => {

  return (
    <View>
      <Title>Valitse koulu</Title>
      <SearchableDropDown items={schools} fieldToSearch="name" onSelected={(school) => setSelectedSchool(school)} />
    </View>
  )
}

export default SelectSchoolPage