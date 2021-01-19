import React, { useState } from "react"
import { Image } from "react-native"
import { List, Modal, Portal, Button, ThemeProvider, Divider, Caption } from "react-native-paper"
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

  const imageLink = books.find(book => book.title === item.Title)?.imageLink

  const condition = parseCondition(item.Condition)

  return <ThemeProvider theme={theme}>
    <List.Item
      theme={theme}
      left={() => <Image style={{ width: 75, height: 100 }} source={{ uri: imageLink }} />}
      title={item.Title}
      description={`${item.User.name}\n${item.Price}€\n${condition}`}
      descriptionNumberOfLines={3}
      onPress={() => setVisible(true)}
    />
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ padding: 20, marginHorizontal: 20, backgroundColor: theme.colors.background, zIndex: 5 }}>
        <View row>
          <Image style={{ width: 100, height: 150 }} source={{ uri: imageLink }} />
        <View marginx={10} justifyContent="space-evenly" shrink>
          <Text numberOfLines={4} ellipsizeMode="tail">{item.Title}</Text>
          <Divider />
          <Text>{item.Publisher}</Text>
          <Divider />
          <Text>{item.Subject}</Text>
          <Divider />
        </View>
        </View>
      <View row justifyContent={"space-between"} marginTop={20}>
        <View shrink width={250}>
          <Text>{item.User.name}</Text>
          <Divider />
          <Text>{item.User.phonenumber}</Text>
        </View>
        <View shrink width={250}>
          <Text>Kunto: {condition.toLowerCase()}</Text>
          <Divider />
          {item.Information ? <>
            <Text>Lisätietoja:</Text>
            <Caption>{item.Information}</Caption>
          </>
            : null
          }
        </View>
      </View>
      <View marginy={10}>
        {userInfo.id === item.User?.id && <Button theme={theme} mode="contained" onPress={() => deleteListing({ variables: { id: item.id } })}>Poista listaus</Button>}
      </View>
      </Modal>
    </Portal>
  </ThemeProvider >
}

export default ListingItem