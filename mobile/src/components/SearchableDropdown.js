import React, { useState } from "react"
import { Text, View, TextInput, FlatList, TouchableHighlight } from "react-native"

const SearchableDropdown = ({ items, fieldToSearch, onSelected }) => {

  const [search, setSearch] = useState("")

  const renderItem = ({ item }) => {

    const regex = new RegExp(`${search}.*?`, "i")

    const textArray = item[fieldToSearch].split(regex)

    const boldPart = item[fieldToSearch].match(regex)

    return <View>
      <TouchableHighlight onPress={() => onSelected(item[fieldToSearch])}>
        <Text>{textArray[0]}<Text style={{fontWeight: "bold"}}>{boldPart}</Text>{textArray[1]}</Text>
      </TouchableHighlight >
    </View>
  }

  let filteredItems = search ? items.filter(item => item[fieldToSearch].toLowerCase().includes(search.toLowerCase())) : []

  let lenghtOver = null

  const maxLength = 9

  if (filteredItems.length > maxLength) {
    lenghtOver = filteredItems.length - maxLength
    filteredItems = filteredItems.slice(0, maxLength)
  }

  return (
    <View style={{ width: 350 }}>
      <TextInput
        style={{ borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Text>{(!filteredItems.length && search) && "Haullasi ei löytynyt tuloksia"}</Text>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item[fieldToSearch]}
      />
      <Text>{lenghtOver && `...${lenghtOver} lisää`}</Text>
    </View>
  )
}

export default SearchableDropdown

