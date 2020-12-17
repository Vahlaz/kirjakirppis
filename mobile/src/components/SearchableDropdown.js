import React, { useState } from "react"
import { View, FlatList } from "react-native"
import { List, Searchbar, Text, Chip } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { getIcon } from "../utils/functions"


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
      setFocus(false)
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

  const style = focus ? {
    width: "100%",
    height: "100%",
    zIndex: 10,
    position: "absolute",
    left: 0,
    top: 0,
    flex: 1
  } : {
      height: 100,
      width: 300
    }

  return (
    <View style={style} >
      {
        selectedItem ?
          <Chip icon={() => getIcon("book", "black")} onPress={() => { setFocus(false); setSelectedItem(null) }} >{selectedItem}</Chip>
          : <>
            <Searchbar
              icon={() => <Ionicons size={24} name="search" />}
              onFocus={() => setFocus(true)}
              placeholder={placeholder || "Etsi"}
              onChangeText={(text) => setSearch(text)}
              value={search}
              clearIcon={() => <Ionicons size={24} name="close" onPress={() => setFocus(false)} />}
              onClear
            />
            {focus &&
              <View style={{ backgroundColor: "white", height: "100%" }}>
                <Text>{(!filteredItems.length && search) && "Haullasi ei löytynyt tuloksia"}</Text>
                <FlatList
                  data={filteredItems}
                  renderItem={renderItem}
                  keyExtractor={item => item[fieldToSearch]}
                />
                <Text>{lenghtOver && `...${lenghtOver} lisää`}</Text>
              </View >
            }
          </>
      }
    </View>
  )
}

export default SearchableDropdown

