import { LOGIN } from "../graphql/mutations"
import { useMutation, useApolloClient } from "@apollo/client"
import { useContext } from "react"
import UserStorageContext from "../contexts/UserStorageContext"
import UserStore from "../stores/UserStore"

const useSignIn = () => {
  const userStorage = useContext(UserStorageContext)
  const apolloClient = useApolloClient()

  const [login] = useMutation(LOGIN)

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await login({ variables: { email, password } })
      if (data?.login) {
        const { token, user } = data.login
        const { name, id, email, phonenumber } = user
        await userStorage.setAccessToken(token)
        await userStorage.setUserInfo({ name, id, email, phonenumber })
        UserStore.update(s => { s.token = token, s.id = id, s.name = name, s.email = email, s.phonenumber = phonenumber })
        apolloClient.resetStore()
      }
    } catch (error) {
      return error
    }
  }

  const signOut = async () => {
    await userStorage.removeAccessToken()
    await userStorage.removeUserInfo()
    UserStore.update(s => { s.token = null, s.id = null, s.name = null, s.email = null, s.phonenumber = null })
    apolloClient.resetStore()
  }

  return { signIn, signOut }
}

export default useSignIn