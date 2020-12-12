const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Price: {
        type: String,
        required: true,
    },
    Information: {
        type: String
    },
    Series: {
        type: String,
        required: true
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
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Listing', schema)