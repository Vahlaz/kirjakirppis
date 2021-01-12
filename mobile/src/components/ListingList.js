import React, { useState } from "react"
import { FlatList, Image, View } from "react-native"
import { List, Modal, Provider, Portal, Text, } from "react-native-paper"
import books from "../assets/books.json"
import { parseCondition } from "../utils/functions"

const ListingItem = ({ item }) => {
  const [visible, setVisible] = useState(false)
  return <>
    <List.Item
      left={() => <Image style={{ width: 75, height: 100 }} source={{ uri: books.find(book => book.title === item.Title)?.imageLink }} />}
      title={item.Title}
      description={`${item.User.name}\n${item.Price}€\n${parseCondition(item.Condition)}`}
      descriptionNumberOfLines={3}
      onPress={() => setVisible(true)}
    />
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ backgroundColor: "white", padding: 20, marginHorizontal: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Image style={{ width: 100, height: 150 }} source={{ uri: books.find(book => book.title === item.Title)?.imageLink }} />
          <View style={{ flex: 1, marginLeft: 10, justifyContent: "space-evenly" }}>
            <Text numberOfLines={4} ellipsizeMode="tail">{item.Title}</Text>
            <Text>{item.Series}</Text>
            <Text>{item.Publisher}</Text>
            <Text>{item.Subject}</Text>
          </View>
        </View>
        <Text>Myyjän puhelinnumero: <Text style={{ fontWeight: "bold" }}>{item.User.phonenumber}</Text></Text>
        {item.Information && <>
          <Text></Text>
          <Text>{item.Information}</Text>
        </>
        }
      </Modal>
    </Portal>
  </>
}


const ListingList = ({ listings }) => {

  const renderItem = ({ item }) => <ListingItem item={item} />

  return (
    <Provider>
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Provider >
  )
}

export default ListingList

