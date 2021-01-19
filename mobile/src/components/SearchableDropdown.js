import React, { useState } from "react"
import { FlatList, Dimensions } from "react-native"
import { List, Searchbar, Chip, Modal, Portal, ThemeProvider, useTheme } from "react-native-paper"
import { getIcon } from "../utils/functions"
import { View, Text } from "./styled"

const SearchableDropdown = ({ items, fieldToSearch, onSelected, placeholder, icon, iconFamily, additionalKeyField, onClose }) => {

  const [search, setSearch] = useState("")
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const { height } = Dimensions.get("window")

  const theme = useTheme()

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
      setVisible(false)
    }

    return (
      <List.Item
        title={<Text>{firstPart}<Text bold color={theme.colors.accent}>{boldPart}</Text>{secondPart}</Text>}
        onPress={() => handlePress()}>
      </List.Item>
    )
  }

  let filteredItems = search ? items.filter(item => item[fieldToSearch].toLowerCase().includes(search.toLowerCase())) : items

  const CustomChip = ({ hasClose, onPress, text }) => (
    <View row centerx centery marginy={20}>
      <Chip icon={() => getIcon({ name: icon, color: theme.colors.text }, iconFamily)} onPress={onPress} style={{ backgroundColor: theme.colors.primary }} mode="outlined">
        <View row maxWidth={240}>
          <Text numberOfLines={1} ellipsizeMode="tail">{text}</Text>
        </View>
        {hasClose && getIcon({ name: "close", size: 20 }, "ioni")}
      </Chip>
    </View>
  )

  const handleClose = () => {
    setSelectedItem(null)
    if (onClose) {
      onClose()
    }
  }

  return <ThemeProvider theme={theme}>
    {
      selectedItem ? <CustomChip onPress={handleClose} text={selectedItem} hasClose />
        :
        <View>
          <Portal>
            <Modal onDismiss={() => setVisible(false)} visible={visible} contentContainerStyle={{ padding: 20, height, backgroundColor: theme.colors.background }} >
              <View>
                <Searchbar
                  icon={() => getIcon({ name: "search" }, "ioni")}
                  placeholder={placeholder || "Etsi"}
                  onChangeText={(text) => setSearch(text)}
                  clearIcon={() => getIcon({ name: "close", onPress: () => setVisible(false) }, "ioni")}
                  autoFocus
                />
                <View height={530}>
                  <Text>{(!filteredItems.length && search) && "Haullasi ei löytynyt tuloksia"}</Text>
                  <FlatList
                    data={filteredItems}
                    renderItem={renderItem}
                    keyExtractor={item => item[fieldToSearch] + item[additionalKeyField]}
                    keyboardShouldPersistTaps="handled"
                  />
                </View>
              </View >
            </Modal>
          </Portal>
          <CustomChip onPress={() => setVisible(true)} text={placeholder} />
        </View>
    }
  </ThemeProvider>
}

export default SearchableDropdown

