import React, { useState } from "react"
import { View } from "react-native"
import { Text, Button, Subheading } from "react-native-paper"
import LoginForm from "./LoginForm"
import LogoutButton from "./LogoutButton"
import useSchool from "../hooks/useSchool"
import NewUserForm from "./NewUserForm"

const ProfilePage = ({ userInfo }) => {

  const { school, removeSchool } = useSchool()

  const [isLoginPage, setIsLoginPage] = useState(true)

  return (
    <View style={{ alignItems: "center", flexWrap: "wrap", alignContent: "center", height: 500 }} >
      <Text>{school}</Text>
      <Button mode="contained" onPress={() => removeSchool()}>Vaihda koulua</Button>
      {userInfo.name && userInfo.token && userInfo.id
        ? <View>
          <Text>{userInfo.name}</Text>
          <LogoutButton />
        </View>
        : isLoginPage ? <LoginForm /> : <NewUserForm />
      }
      <Subheading style={{ marginTop: 10 }} onPress={() => setIsLoginPage(!isLoginPage)}>
        <Text>
          {isLoginPage ? "Etkö ole vielä käyttäjä? Rekisteröidy " : "Oletko jo käyttäjä? Kirjaudu "}
          <Text style={{ fontWeight: "bold" }}>tästä</Text>
        </Text>
      </Subheading>
    </View >
  )
}

export default ProfilePage

