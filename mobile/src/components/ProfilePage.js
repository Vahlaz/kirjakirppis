import React, { useState } from "react"
import { Button } from "react-native-paper"
import LoginForm from "./LoginForm"
import LogoutButton from "./LogoutButton"
import useSchool from "../hooks/useSchool"
import NewUserForm from "./NewUserForm"
import { Subheading, View, Text} from "./styled"

const ProfilePage = ({ userInfo }) => {

  const { school, removeSchool } = useSchool()

  const [isLoginPage, setIsLoginPage] = useState(true)

  return (
    <View centerx wrap>
      <Subheading marginTop={10}>{school}</Subheading>
      <Button mode="contained" onPress={() => removeSchool()}>Vaihda koulua</Button>
      {userInfo.name && userInfo.token && userInfo.id
        ? <>
          <Subheading marginTop={40}>{userInfo.name}</Subheading>
          <Subheading>{userInfo.email}</Subheading>
          <Subheading>{userInfo.phonenumber}</Subheading>
          <LogoutButton />
        </>
        : <View>
          {isLoginPage ? <LoginForm /> : <NewUserForm />}
          <Subheading marginTop={10} onPress={() => setIsLoginPage(!isLoginPage)}>
            <Text>
              {isLoginPage ? "Etkö ole vielä käyttäjä? Rekisteröidy " : "Oletko jo käyttäjä? Kirjaudu "}
              <Text bold>tästä</Text>
            </Text>
          </Subheading>
        </View>
      }
    </View >
  )
}

export default ProfilePage

