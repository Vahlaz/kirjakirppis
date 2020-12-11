import React from "react"
import { View, Text } from "react-native"
import { Link } from "react-router-native"

const NavMenu = () => {

  return (
    <View>
      <Link to="/">
        <Text>Pääsivu</Text>
      </Link>
      <Link to="/profile">
        <Text>Profiili</Text>
      </Link>
    </View>
  )
}

export default NavMenu