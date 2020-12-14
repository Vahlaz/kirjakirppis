import { LOGIN } from "../graphql/mutations"
import { useMutation, useApolloClient } from "@apollo/client"
import { useContext } from "react"
import AuthStorageContext from "../contexts/AuthStorageContext"

const useSignIn = () => {
  const [login, result] = useMutation(LOGIN)
  const authStorage = useContext(AuthStorageContext)
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const { data } = await login({ variables: { username, password } })
    if (data?.login?.token) {
      await authStorage.setAccessToken(data.login.token)
      apolloClient.resetStore()
    }
  }

  return [signIn, result]
}

export default useSignIn