import React, { useState } from "react"
import { View } from "react-native"
import { FAB } from "react-native-paper"
import ListingForm from "./ListingForm"
import ListingList from "./ListingList"
import { ALL_LISTINGS } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"

const MyListingsPage = () => {

  const [showForm, setShowForm] = useState(false)

  const [school] = useSchool()

  const userInfo = useUserInfo()

  const result = useQuery(ALL_LISTINGS, { variables: { school, user: userInfo?.id } })

  if (!result || result.loading || !result.data) {
    return null
  }

  const listings = result.data.allListings

  return (
    <View style={{ flex: 1 }}>
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          zIndex: 300
        }}
        icon={showForm ? "minus" : "plus"}
        onPress={() => setShowForm(!showForm)}
      />
      {showForm
        ? <ListingForm />
        : <ListingList listings={listings} />
      }
    </View>
  )
}

export default MyListingsPage

