import React, { useState } from "react"
import { BottomNavigation } from "react-native-paper"
import ListingsPage from "./ListingsPage"
import ProfilePage from "./ProfilePage"
import { withTheme } from "react-native-paper"

const NavMenu = ({ theme }) => {

  const [index, setIndex] = useState(0)

  const ListingsRoute = () => <ListingsPage />

  const ProfileRoute = () => <ProfilePage />

  const routes = [
    { key: "listings", title: "Listaukset", icon: "book", color: theme.colors.primary},
    { key: "profile", title: "Minä", icon: "account-circle", color: theme.colors.accent }
  ]

  const renderScene = BottomNavigation.SceneMap({
    listings: ListingsRoute,
    profile: ProfileRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  )
}

export default withTheme(NavMenu)