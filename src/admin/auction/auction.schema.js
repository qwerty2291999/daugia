const mongoose = require('mongoose');
const AuctionSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    auctionId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    startingPrice:{
        type:Number,
        required:true
    },
    minBet:{
        type:Number,
        required:true
    },
    currentBet:{
        type:Number,
        required:true
    },
    dateStart:{
        type:String,
        required:true
    },
    dateEnd:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Auctions',AuctionSchema)