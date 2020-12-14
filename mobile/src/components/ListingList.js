import React from "react"
import { FlatList, Image } from "react-native"
import { List } from "react-native-paper"
import books from "../assets/books.json"
import { parseCondition } from "../utils/functions"

const ListingList = ({ listings }) => {

  const renderItem = ({ item }) => {
    return (
      <List.Item
        left={() => <Image style={{ width: 75, height: 100 }} source={{ uri: books.find(book => book.title === item.Title)?.imageLink }} />}
        title={item.Title}
        description={`${item.User.name}\n${item.Price}€\n${parseCondition(item.Condition)}`}
        descriptionNumberOfLines={3}
      />
    )
  }

  return (
    <FlatList
      data={listings}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}

export default ListingList

