import React from "react"
import { FlatList } from "react-native"
import { List, useTheme } from "react-native-paper"
import { View, Text } from "./styled"

const SeachList = ({ fieldToSearch, items, search, handlePress }) => {

  const theme = useTheme()

  const renderItem = ({ item }) => {

    const regex = new RegExp(`${search}`, "i")

    let textArray = item[fieldToSearch].split(regex)

    const boldPart = item[fieldToSearch].match(regex)

    const firstPart = textArray[0]

    const secondPart = textArray.splice(1).join(boldPart)

    return (
      <List.Item
        title={<Text>{firstPart}<Text bold color={theme.colors.accent}>{boldPart}</Text>{secondPart}</Text>}
        onPress={() => handlePress(item[fieldToSearch])}>
      </List.Item>
    )
  }


  return (
    <View height={530}>
      <Text>{(!items.length && search) && "Haullasi ei löytynyt tuloksia"}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item[fieldToSearch]}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
}

export default SeachList

