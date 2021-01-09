import React from "react"
import { View } from "react-native"
import SearchableDropDown from "./SearchableDropdown"
import schools from "../assets/schools.json"
import { Title, Provider } from "react-native-paper"

const SelectSchoolPage = ({ setSelectedSchool }) => {

  return (
    <View style={{ flex: 1, alignContent: "center", alignItems: "center", }}>
      <Provider>
        <Title>Valitse koulu</Title>
        <SearchableDropDown items={schools} fieldToSearch="name" onSelected={(school) => setSelectedSchool(school)} placeholder={"Valitse koulu"} icon="school" iconFamily="ioni" />
      </Provider>
    </View>
  )
}

export default SelectSchoolPage