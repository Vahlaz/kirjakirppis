import { useContext } from "react"
import UserStorageContext from "../contexts/UserStorageContext"
import UserStore from "../stores/UserStore"

const useUserInfo = () => {
  const userStorage = useContext(UserStorageContext)

  const userInfo = UserStore.useState()

  const getUserInfo = async () => {
    const info = await userStorage.getUserInfo()
    const token = await userStorage.getAccessToken()
    if (info && token) {
      const { id, username } = info
      UserStore.update(s => { s.token = token })
      UserStore.update(s => { s.id = id })
      UserStore.update(s => { s.username = username })
    }
  }

  return { userInfo, getUserInfo }
}

export default useUserInfo