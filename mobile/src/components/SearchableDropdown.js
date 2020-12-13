import React, { useState } from "react"
import { View, FlatList, Dimensions } from "react-native"
import { List, Searchbar, Text, Button } from "react-native-paper"

const SearchableDropdown = ({ items, fieldToSearch, onSelected, placeholder }) => {

  const [search, setSearch] = useState("")
  const [focus, setFocus] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const renderItem = ({ item }) => {

    const regex = new RegExp(`${search}`, "i")

    let textArray = item[fieldToSearch].split(regex)

    const boldPart = item[fieldToSearch].match(regex)

    const firstPart = textArray[0]

    const secondPart = textArray.splice(1).join(boldPart)

    const handlePress = () => {
      onSelected(item[fieldToSearch])
      setSearch("")
      setSelectedItem(item[fieldToSearch])
    }

    return (
      <List.Item
        title={<Text>{firstPart}<Text style={{ fontWeight: "bold" }}>{boldPart}</Text>{secondPart}</Text>}
        onPress={() => handlePress()}>
      </List.Item>
    )
  }

  let filteredItems = search ? items.filter(item => item[fieldToSearch].toLowerCase().includes(search.toLowerCase())) : []

  let lenghtOver = null

  const maxLength = 9

  if (filteredItems.length > maxLength) {
    lenghtOver = filteredItems.length - maxLength
    filteredItems = filteredItems.slice(0, maxLength)
  }

  const onFocusStyle = focus ? {
    width: search && Dimensions.get("window").width,
    position: "static",
    left: 0,
    top: 0
  } : {}

  return (
    <>
      {
        selectedItem ?
          <Text>{selectedItem}<Button icon="close" onPress={() => setSelectedItem(null)}/></Text>
          : <View style={{ backgroundColor: "white", ...onFocusStyle }}>

            <Searchbar
              icon={false}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder={placeholder || "Etsi"}
              onChangeText={(text) => setSearch(text)}
              value={search}
            />

            {focus && <Text>{(!filteredItems.length && search) && "Haullasi ei löytynyt tuloksia"}</Text>}
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={item => item[fieldToSearch]}
            />
            {focus && <Text>{lenghtOver && `...${lenghtOver} lisää`}</Text>}

          </View >
      }
    </>
  )
}

export default SearchableDropdown

