import { LOGIN } from "../graphql/mutations"
import { useMutation, useApolloClient } from "@apollo/client"
import { useContext } from "react"
import UserStorageContext from "../contexts/UserStorageContext"

const useSignIn = () => {
  const [login, result] = useMutation(LOGIN)
  const userStorage = useContext(UserStorageContext)
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const { data } = await login({ variables: { username, password } })
    if (data?.login) {
      const {token, username, id} = data.login
      await userStorage.setAccessToken(token)
      await userStorage.setUserInfo({username, id})
      apolloClient.resetStore()
    }
  }

  return [signIn, result]
}

export default useSignIn