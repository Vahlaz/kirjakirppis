const User = require('../../models/UserSchema')

const allUsers = async () => {
    return User.find({})
} 

module.exports = allUsers
