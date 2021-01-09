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
      const { id, name, email, phonenumber } = info
      UserStore.update(s => { s.token = token, s.id = id, s.name = name, s.email = email, s.phonenumber = phonenumber })
    }
  }

  return { userInfo, getUserInfo }
}

export default useUserInfo