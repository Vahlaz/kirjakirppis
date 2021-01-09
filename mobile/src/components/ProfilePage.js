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
      <Subheading style={{marginTop: 10}}>{school}</Subheading>
      <Button mode="contained" onPress={() => removeSchool()}>Vaihda koulua</Button>
      {userInfo.name && userInfo.token && userInfo.id
        ? <>
          <Subheading style={{marginTop: 40}}>{userInfo.name}</Subheading>
          <Subheading>{userInfo.email}</Subheading>
          <Subheading>{userInfo.phonenumber}</Subheading>
          <LogoutButton />
        </>
        : <View>
          {isLoginPage ? <LoginForm /> : <NewUserForm />}
          <Subheading style={{ marginTop: 10 }} onPress={() => setIsLoginPage(!isLoginPage)}>
            <Text>
              {isLoginPage ? "Etkö ole vielä käyttäjä? Rekisteröidy " : "Oletko jo käyttäjä? Kirjaudu "}
              <Text style={{ fontWeight: "bold" }}>tästä</Text>
            </Text>
          </Subheading>
        </View>
      }
    </View >
  )
}

export default ProfilePage

