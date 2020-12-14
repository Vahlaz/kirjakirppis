import { useApolloClient } from "@apollo/client"
import { useContext } from "react"
import UserStorageContext from "../contexts/UserStorageContext"

const useSignOut = () => {
  const userStorage = useContext(UserStorageContext)
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await userStorage.removeAccessToken()
    await userStorage.removeUserInfo()
    apolloClient.resetStore()
  }

  return signOut
}

export default useSignOut