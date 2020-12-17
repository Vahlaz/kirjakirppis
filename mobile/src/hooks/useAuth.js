import { LOGIN } from "../graphql/mutations"
import { useMutation, useApolloClient } from "@apollo/client"
import { useContext } from "react"
import UserStorageContext from "../contexts/UserStorageContext"
import UserStore from "../stores/UserStore"

const useSignIn = () => {
  const userStorage = useContext(UserStorageContext)
  const apolloClient = useApolloClient()

  const [login] = useMutation(LOGIN)

  const signIn = async ({ username, password }) => {
    const { data } = await login({ variables: { username, password } })
    if (data?.login) {
      const { token, username, id } = data.login
      await userStorage.setAccessToken(token)
      await userStorage.setUserInfo({ username, id })
      UserStore.update(s => { s.username = username })
      UserStore.update(s => { s.id = id })
      UserStore.update(s => { s.token = token })
      apolloClient.resetStore()
    }
  }

  const signOut = async () => {
    await userStorage.removeAccessToken()
    await userStorage.removeUserInfo()
    UserStore.update(s => { s.username = null })
    UserStore.update(s => { s.id = null })
    UserStore.update(s => { s.token = null })
    apolloClient.resetStore()
  }

  return { signIn, signOut }
}

export default useSignIn