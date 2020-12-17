import React from "react"
import { Button } from "react-native-paper"
import useAuth from "../hooks/useAuth"

const LogoutButton = () => {

  const { signOut } = useAuth()

  return <Button mode="outlined " onPress={signOut}>Kirjaudu ulos</Button>
}

export default LogoutButton

