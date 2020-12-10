import React, { useState } from "react"
import { Text, View, TextInput, FlatList } from "react-native"
import schools from "../assets/schools.json"


const SearchableDropdown = () => {

  const [search, setSearch] = useState("")

  const renderItem = ({ item }) => <View><Text>{item.name}</Text></View>

  const filteredSchools = search ? schools.filter(school => school.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : []

  return (
    <View>
      <Text>Valitse</Text>
      <TextInput
        style={{ borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={filteredSchools}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

export default SearchableDropdown

