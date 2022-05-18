const mongoose = require("mongoose");

const carTemplate = new mongoose.Schema({
    brand:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    fuel:{
        type: String,
        default: ""
    },
    year:{
        type: Date,
        required: true
    },
    horsepower:{
        type: Number,
        required: true
    },
    added:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "usertable", 
        required: true 
    }
})

module.exports = mongoose.model('cartable',carTemplate)