import React, { useState } from "react"
import { FAB } from "react-native-paper"
import ListingForm from "./ListingForm"
import ListingList from "./ListingList"
import { ALL_LISTINGS } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import useSchool from "../hooks/useSchool"
import useUserInfo from "../hooks/useUserInfo"
import { getIcon } from "../utils/functions"
import { Subheading, View } from "./styled"

const MyListingsPage = () => {

  const [showForm, setShowForm] = useState(false)

  const { school } = useSchool()

  const { userInfo } = useUserInfo()

  const result = useQuery(ALL_LISTINGS, { variables: { school, user: userInfo?.id } })

  if (!userInfo.id) {
    return <Subheading padding={20}>Kirjaudu sisään tehdäksesi listauksia</Subheading>
  }

  if (!result || result.loading || !result.data) {
    return null
  }

  const listings = result.data.allListings

  return (
    <View flexGrow>
      {showForm
        ? <ListingForm setShowForm={setShowForm} />
        : listings.length !== 0
          ? <ListingList listings={listings} />
          : <Subheading padding={20}>Et ole vielä tehnyt yhtään myynti-ilmoitusta. Voit tehdä uuden listauksen painamalla +-nappia</Subheading>
      }
      <FAB
        style={{
          position: "absolute",
          margin: 16,
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

