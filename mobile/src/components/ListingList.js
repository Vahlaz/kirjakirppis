import React from "react"
import { FlatList, List, Text } from "react-native-paper"

const ListingList = ({ items }) => {

  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={<Text>{item.name}</Text>}
        onPress={() => { }}>
      </List.Item>
    )
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}

export default ListingList

