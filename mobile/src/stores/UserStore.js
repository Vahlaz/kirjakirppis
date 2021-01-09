import { Store } from "pullstate"

const UserStore = new Store({
  school: null,
  name: null,
  email: null,
  phonenumber: null,
  id: null,
  token: null
})

export default UserStore