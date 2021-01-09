import React from "react"
import { View } from "react-native"
import ListingList from "./ListingList"
import { ALL_LISTINGS } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import useSchool from "../hooks/useSchool"

const ListingsPage = () => {

  const { school } = useSchool()

  const result = useQuery(ALL_LISTINGS, { variables: { school } })

  if (!result || result.loading || !result.data) {
    return null
  }

  const listings = result.data.allListings


  return (
    <View style={{ flex: 1 }}>
      <ListingList listings={listings} />
    </View>
  )
}

export default ListingsPage

