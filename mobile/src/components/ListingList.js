import React from "react"
import { FlatList } from "react-native"
import { Provider, useTheme } from "react-native-paper"
import { useApolloClient } from "@apollo/client"
import ListingItem from "./ListingItem"

const ListingList = ({ listings }) => {

  const client = useApolloClient()

  const theme = useTheme()

  const renderItem = ({ item }) => <ListingItem item={item} theme={theme}/>



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

