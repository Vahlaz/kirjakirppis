import React from "react"
import { View } from "react-native"
import { Text, Button } from "react-native-paper"
import LoginForm from "./LoginForm"
import LogoutButton from "./LogoutButton"
import useSchool from "../hooks/useSchool"

const ProfilePage = ({ userInfo }) => {

  // eslint-disable-next-line no-unused-vars
  const [school, setSchool, removeSchool] = useSchool()

  return (
    <View>
      { userInfo
        ? <View style={{ flex: 1 }}>
          <Text>Koulusi: {school}</Text>
          <Button mode="outlined " onPress={() => removeSchool()}>Vaihda koulua</Button>
          <LogoutButton />
        </View>
        : <LoginForm />
      }
    </View >
  )
}

export default ProfilePage

