import AsyncStorage from "@react-native-community/async-storage"

class UserStorage {
  constructor(namespace = "user") {
    this.namespace = namespace
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`)
    return accessToken
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken)
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`)
  }

  async getUserInfo() {
    const rawInfo = await AsyncStorage.getItem(`${this.namespace}:info`)
    return rawInfo ? JSON.parse(rawInfo) : null
  }

  async setUserInfo({ username, id }) {
    await AsyncStorage.setItem(`${this.namespace}:info`, JSON.stringify({ username, id }))
  }

  async removeUserInfo() {
    await AsyncStorage.removeItem(`${this.namespace}:info`)
  }

  async getSchool() {
    return await AsyncStorage.getItem(`${this.namespace}:school`)
  }

  async setSchool(school) {
    await AsyncStorage.setItem(`${this.namespace}:school`, school)
  }

  async removeSchool() {
    await AsyncStorage.removeItem(`${this.namespace}:school`)
  }
}

export default UserStorage