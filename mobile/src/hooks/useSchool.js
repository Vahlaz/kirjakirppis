import { useContext } from "react"
import UserStorageContext from "../contexts/UserStorageContext"
import UserStore from "../stores/UserStore"

const useSchool = () => {

  const school = UserStore.useState(s => s.school)

  const userStorage = useContext(UserStorageContext)

  const getSchool = async () => {
    const newSchool = await userStorage.getSchool()
    UserStore.update(s => { s.school = newSchool })
  }

  const setSchool = async (newSchool) => {
    await userStorage.setSchool(newSchool)
    UserStore.update(s => { s.school = newSchool })
  }

  const removeSchool = async (school) => {
    await userStorage.removeSchool(school)
    UserStore.update(s => { s.school = null })
  }

  return { school, setSchool, removeSchool, getSchool }
}

export default useSchool