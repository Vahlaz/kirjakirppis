import { Store } from "pullstate"

const UserStore = new Store({
  school: null,
  username: null,
  id: null,
  token: null
})

export default UserStore