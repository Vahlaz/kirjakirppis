import React, { useState } from "react"
import { FlatList, Image, View } from "react-native"
import { List, Modal, Provider, Portal, Text, Button } from "react-native-paper"
import { DELETE_LISTING } from "../graphql/mutations"
import { useMutation, useApolloClient } from "@apollo/client"
import books from "../assets/books.json"
import { parseCondition } from "../utils/functions"
import useUserInfo from "../hooks/useUserInfo"

const ListingItem = ({ item }) => {
  const [visible, setVisible] = useState(false)

  const [deleteListing] = useMutation(DELETE_LISTING, { refetchQueries: ["allListings"] })

  const { userInfo } = useUserInfo()

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
        {item.Information ? <>
          <Text></Text>
          <Text>{item.Information}</Text>
        </>
          : null
        }
        {userInfo.id === item.User?.id && <Button mode="contained" onPress={() => deleteListing({ variables: { id: item.id } })}>Poista listaus</Button>}
      </Modal>
    </Portal>
  </>
}


const ListingList = ({ listings }) => {
  
  const client = useApolloClient()

  const renderItem = ({ item }) => <ListingItem item={item} />

  return (
    <Provider>
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={() => client.reFetchObservableQueries()}
        refreshing={!listings}
      />
    </Provider >
  )
}

export default ListingList

