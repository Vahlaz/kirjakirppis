import React, { useState } from "react"
import { View } from "react-native"
import NewListingForm from "./NewListingForm"
import LoginForm from "./LoginForm"

const ProfilePage = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <View>
      {loggedIn 
      ? <NewListingForm />
      : <LoginForm/>
    }
    </View>
  )
}

export default ProfilePage

