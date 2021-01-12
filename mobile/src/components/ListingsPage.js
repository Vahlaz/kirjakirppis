import React from "react"
import { View } from "react-native"
import { Subheading } from "react-native-paper"
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
      {listings && listings.length !== 0
        ? <ListingList listings={listings} />
        : <Subheading style={{ padding: 20 }}>Koulullasi ei ole vielä yhtään myynti-ilmoitusta</Subheading>
      }
    </View>
  )
}

export default ListingsPage

