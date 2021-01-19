import React, { useState } from "react"
import { FAB } from "react-native-paper"
import ListingForm from "./ListingForm"
import ListingList from "./ListingList"
import { getIcon } from "../utils/functions"
import { Subheading, View } from "./styled"

const MyListingsPage = ({ result, userInfo }) => {

  const [showForm, setShowForm] = useState(false)

  if (!userInfo.id) {
    return <Subheading padding={20}>Kirjaudu sisään tehdäksesi listauksia</Subheading>
  }

  if (!result || result.loading || !result.data) {
    return null
  }

  const listings = result.data.allListings

  const myListings = listings.filter(listing => listing.User.id === userInfo.id)

  return (
    <View flexGrow>
      {showForm
        ? <ListingForm setShowForm={setShowForm} />
        : listings.length !== 0
          ? <ListingList listings={myListings} />
          : <Subheading padding={20}>Et ole vielä tehnyt yhtään myynti-ilmoitusta. Voit tehdä uuden listauksen painamalla +-nappia</Subheading>
      }
      <FAB
        style={{
          position: "absolute",
          margin: 20,
          right: 0,
          bottom: 0,
          zIndex: 10
        }}
        icon={() => showForm ? getIcon({ name: "minus" }) : getIcon({ name: "plus" })}
        onPress={() => setShowForm(!showForm)}
      />
    </View>
  )
}

export default MyListingsPage

