const AuctionMongoose = require("../auction/auction.mongoose");
const ParticipantsMongoose = require("./participants.mongoose");
const mongoose = new ParticipantsMongoose
const auction = new AuctionMongoose;
class PaticipantsServices {
    async findAll(){
        const docs = await mongoose.findAll()
        return docs;
    }
    async findOne(id){
        const doc = await mongoose.findOne(id)
        return doc
    }   
    async create(obj){
        const doc = await mongoose.create(obj)
        return doc;
    }
    async bet(uid,aucid,price){
        const query = await auction.findOne({auctionId:aucid})
        const auc = query[0]
        if(price>=auc.startingPrice){
            if(price-auc.currentBet>=auc.minBet){
                await mongoose.update({userId:uid,betPrice:price})
                await auction.updateBet({_id:auc._id,currentBet:price})
                return "Bet successful"
            }
            else return `Must higher or equal ${auc.currentBet+auc.minBet}`
            
        }
        else return `Must higher ${auc.currentBet+auc.minBet}`
    }
}
module.exports = PaticipantsServices;