import React from "react"
import { View } from "./styled"
import SearchableDropDown from "./SearchableDropdown"
import schools from "../assets/schools.json"
import { Title } from "react-native-paper"


const SelectSchoolPage = ({ setSelectedSchool }) => {

  return (
    <View centerx flexGrow>
        <Title>Valitse koulu</Title>
        <SearchableDropDown items={schools} fieldToSearch="name" onSelected={(school) => setSelectedSchool(school)} placeholder={"Valitse koulu"} icon="school" iconFamily="ioni" />
    </View>
  )
}

export default SelectSchoolPage