const mongoose = require('mongoose')

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
  listings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  },
  information: {
    type: String,
  },
  passwordhash: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', schema)
