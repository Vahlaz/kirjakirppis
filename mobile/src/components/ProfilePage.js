import React from "react"
import { View } from "react-native"
import { Text, Button } from "react-native-paper"
import LoginForm from "./LoginForm"
import LogoutButton from "./LogoutButton"
import useSchool from "../hooks/useSchool"

const ProfilePage = ({ userInfo }) => {

  const { school, removeSchool } = useSchool()

  return (
    <View>
      <Text>{school}</Text>
      <Button mode="outlined " onPress={() => removeSchool()}>Vaihda koulua</Button>
      { userInfo.username && userInfo.token && userInfo.id
        ? <View style={{ flex: 1 }}>
          <Text>{userInfo.username}</Text>
          <LogoutButton />
        </View>
        : <LoginForm />
      }
    </View >
  )
}

export default ProfilePage

