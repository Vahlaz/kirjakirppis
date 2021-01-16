import React, { useState } from "react"
import { Image } from "react-native"
import { List, Modal, Portal, Button, ThemeProvider } from "react-native-paper"
import { DELETE_LISTING } from "../graphql/mutations"
import { useMutation } from "@apollo/client"
import books from "../assets/books.json"
import { parseCondition } from "../utils/functions"
import useUserInfo from "../hooks/useUserInfo"
import { View, Text } from "./styled"

const ListingItem = ({ item, theme }) => {
  const [visible, setVisible] = useState(false)

  const [deleteListing] = useMutation(DELETE_LISTING, { refetchQueries: ["allListings"] })

  const { userInfo } = useUserInfo()

  return <ThemeProvider theme={theme}>
    <List.Item
      theme={theme}
      left={() => <Image style={{ width: 75, height: 100 }} source={{ uri: books.find(book => book.title === item.Title)?.imageLink }} />}
      title={item.Title}
      description={`${item.User.name}\n${item.Price}€\n${parseCondition(item.Condition)}`}
      descriptionNumberOfLines={3}
      onPress={() => setVisible(true)}
    />
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ padding: 20, marginHorizontal: 20, backgroundColor: theme.colors.background }}>
        <View row>
          <Image style={{ width: 100, height: 150 }} source={{ uri: books.find(book => book.title === item.Title)?.imageLink }} />
          <View marginx={10} justifyContent="space-evenly">
            <Text numberOfLines={4} ellipsizeMode="tail">{item.Title}</Text>
            <Text>{item.Series}</Text>
            <Text>{item.Publisher}</Text>
            <Text>{item.Subject}</Text>
          </View>
        </View>
        <Text>Myyjän puhelinnumero: <Text bold>{item.User.phonenumber}</Text></Text>
        {item.Information ? <>
          <Text></Text>
          <Text>{item.Information}</Text>
        </>
          : null
        }
        {userInfo.id === item.User?.id && <Button theme={theme} mode="contained" onPress={() => deleteListing({ variables: { id: item.id } })}>Poista listaus</Button>}
      </Modal>
    </Portal>
  </ThemeProvider>
}

export default ListingItem