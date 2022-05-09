const mongoose = require("mongoose");

const userTemplate = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('usertable',userTemplate)