const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Price: {
    type: Number,
    required: true,
  },
  Information: String,
  Series: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Publisher: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Condition: {
    type: Number,
    required: true,
  },
  School: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Listing', schema)
