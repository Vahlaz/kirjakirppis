import React from "react"
import { Button } from "react-native-paper"
import useSignOut from "../hooks/useSignOut"

const LogoutButton = () => {

  const signOut = useSignOut()

  return <Button mode="contained" onPress={signOut}>Kirjaudu ulos</Button>
}

export default LogoutButton
