import React, { useState, useEffect } from "react"
import { BottomNavigation, withTheme } from "react-native-paper"
import ListingsPage from "./ListingsPage"
import MyListingsPage from "./MyListingsPage"
import ProfilePage from "./ProfilePage"
import useUserInfo from "../hooks/useUserInfo"

const NavMenu = ({ theme }) => {

  const [index, setIndex] = useState(1)

  const userInfo = useUserInfo()

  const ListingsRoute = () => <ListingsPage />

  const MyListingsRoute = () => <MyListingsPage />

  const ProfileRoute = () => <ProfilePage userInfo={userInfo} />

  const routes = [
    { key: "listings", title: "Listaukset", color: theme.colors.primary, icon: "book" },
    { key: "myListings", title: "Minun listaukseni", color: theme.colors.primary, icon: "book-account" },
    { key: "profile", title: "Profiili", color: theme.colors.accent, icon: "account-circle" }
  ]

  const renderScene = BottomNavigation.SceneMap({
    listings: ListingsRoute,
    myListings: MyListingsRoute,
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