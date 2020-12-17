import { useContext, useEffect, useState } from "react"
import UserStorageContext from "../contexts/UserStorageContext"

const useSchool = () => {

  const [schoolInfo, setSchoolInfo] = useState()
  const userStorage = useContext(UserStorageContext)

  const getSchool = async () => {
    setSchoolInfo(await userStorage.getSchool())
  }

  const setSchool = async (school) => {
    await userStorage.setSchool(school)
    getSchool()
  }

  const removeSchool = async (school) => {
    await userStorage.removeSchool(school)
  }

  useEffect(() => {
    getSchool()
  }, [])

  return [schoolInfo, setSchool, removeSchool]
}

export default useSchool