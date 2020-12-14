import React, { useState } from "react"
import { View } from "react-native"
import { FAB } from "react-native-paper"
import ListingForm from "./ListingForm"

const MyListingsPage = () => {

  const [showForm, setShowForm] = useState(false)

  return (
    <View style={{height: "100%"}}>
      {showForm && <ListingForm />}
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon={showForm ? "minus" : "plus"}
        onPress={() => setShowForm(!showForm)}
      />
    </View>
  )
}

export default MyListingsPage

