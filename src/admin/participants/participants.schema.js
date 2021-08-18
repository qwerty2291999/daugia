const mongoose = require('mongoose')
const ParticipantsMongoose = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    auctionId:{
        type:String,
        required:true
    },
    betPrice:{
        type:Number
    }
})
module.exports = mongoose.model("Paticipants",ParticipantsMongoose);