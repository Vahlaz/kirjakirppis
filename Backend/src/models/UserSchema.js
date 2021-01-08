const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  }],
  information: String,
  passwordhash: {
    type: String,
    required: true,
  },
  school: String,
})

module.exports = mongoose.model('User', schema)
