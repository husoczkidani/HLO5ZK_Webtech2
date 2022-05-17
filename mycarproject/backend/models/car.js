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
        tpye: String,
        default: ""
    },
    year:{
        type: Date,
        required: true
    },
    horsepower:{
        type: Number,
        default: 0
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