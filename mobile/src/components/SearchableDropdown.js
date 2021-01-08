import React, { useState } from "react"
import { View, FlatList } from "react-native"
import { List, Searchbar, Text, Chip } from "react-native-paper"
import { getIcon } from "../utils/functions"


const SearchableDropdown = ({ items, fieldToSearch, onSelected, placeholder, icon, iconFamily }) => {

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
    flex: 1,
    elevation: 100
  } : {
      height: 100,
      width: 300,
    }

  return (
    <View style={style} >
      {
        selectedItem ?
          <>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Chip icon={() => getIcon({ name: icon, color: "black" })} onPress={() => { setFocus(false); setSelectedItem(null) }}>
                <View style={{ flexDirection: "row", maxWidth: 240 }}>
                  <Text numberOfLines={1} ellipsizeMode="tail">{selectedItem}</Text>
                </View>
                {getIcon({ name: "close", size: 20 }, "ioni")}
              </Chip>
            </View>
          </>
          : <>
            {focus ?
              <View style={{ backgroundColor: "white", flex: 1 }}>
                <Searchbar
                  icon={() => getIcon({ name: "search" }, "ioni")}
                  onFocus={() => setFocus(true)}
                  placeholder={placeholder || "Etsi"}
                  onChangeText={(text) => setSearch(text)}
                  value={search}
                  clearIcon={() => getIcon({ name: "close", onPress: () => setFocus(false) }, "ioni")}
                  autoFocus
                />

                <Text>{(!filteredItems.length && search) && "Haullasi ei löytynyt tuloksia"}</Text>
                <FlatList
                  data={filteredItems}
                  renderItem={renderItem}
                  keyExtractor={item => item[fieldToSearch]}
                />
                <Text>{lenghtOver && `...${lenghtOver} lisää`}</Text>
              </View >
              :
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <Chip icon={() => getIcon({ name: icon, color: "black" }, iconFamily)} onPress={() => setFocus(true)}>
                  <View><Text>{placeholder}</Text></View>
                </Chip>
              </View>
            }
          </>
      }
    </View>
  )
}

export default SearchableDropdown

