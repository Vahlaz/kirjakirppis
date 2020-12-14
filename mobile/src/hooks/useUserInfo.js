import { useContext, useEffect, useState } from "react"
import UserStorageContext from "../contexts/UserStorageContext"

const useUserInfo = () => {

  const [info, setInfo] = useState()
  const userStorage = useContext(UserStorageContext)

  const getInfo = async () => {
    setInfo(await userStorage.getUserInfo())
  }

  useEffect(() => {
    getInfo()
  }, [])

  return info
}

export default useUserInfo