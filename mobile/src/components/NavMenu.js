import React from "react"
import ListingsPage from "./ListingsPage"
import MyListingsPage from "./MyListingsPage"
import ProfilePage from "./ProfilePage"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { View } from "./styled"
import { Headline } from "react-native-paper"
import { useTheme } from "@react-navigation/native"

const NavHeader = ({ name, children }) => {
  const { colors } = useTheme()
  return <>
    < View backgroundColor={colors.primary} >
      <View centerx centery height={50} marginTop={30}>
        <Headline>{name}</Headline>
      </View >
    </View>
    <View flexGrow>
      {children}
    </View>
  </>
}



const NavMenu = () => {

  const Tab = createMaterialTopTabNavigator()

  const renderPage = (page, name) => {
    return <NavHeader name={name}>{page}</NavHeader>
  }


  return (
    <Tab.Navigator
      initialRouteName={"Listings"}
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: function Icon({ color }) {
          let name
          switch (route.name) {
            case "Listings":
              name = "book"
              break
            case "MyListings":
              name = "book-account"
              break
            default:
              name = "account-circle"
              break
          }
          return <MaterialCommunityIcons name={name} color={color} size={24}></MaterialCommunityIcons>
        }
      })
      }
    >
      <Tab.Screen name="Listings">{() => renderPage(<ListingsPage />, "Listaukset")}</Tab.Screen>
      <Tab.Screen name="MyListings">{() => renderPage(<MyListingsPage />, "Omat listaukseni")}</Tab.Screen>
      <Tab.Screen name="Profile">{() => renderPage(<ProfilePage />, "Profiili")}</Tab.Screen>
    </Tab.Navigator >
  )
}

export default NavMenu