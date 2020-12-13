import React, { useState } from "react"
import { BottomNavigation, withTheme } from "react-native-paper"
import ListingsPage from "./ListingsPage"
import ProfilePage from "./ProfilePage"


const NavMenu = ({ theme }) => {

  const [index, setIndex] = useState(1)

  const ListingsRoute = () => <ListingsPage />

  const ProfileRoute = () => <ProfilePage />

  const routes = [
    { key: "listings", title: "Listaukset", color: theme.colors.primary, icon: "book" },
    { key: "profile", title: "Minä", color: theme.colors.accent, icon: "account-circle" } 
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