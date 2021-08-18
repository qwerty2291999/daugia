const mongoose = require('mongoose')
const Notify = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    AuctionID:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Notification",Notify)