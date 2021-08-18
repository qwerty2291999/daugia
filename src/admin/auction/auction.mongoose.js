const auction = require('./auction.schema')
class AuctionMongoose{
    async create(params){
        const doc = await auction.create(params)
        return doc;
    }
    async findOne(any){
        const doc = await auction.find(any)
        return doc;
    }
    async getAll(){
        const docs = await auction.find();
        return docs;
    }
    async updateOne(params){
        await auction.updateOne({_id:params.id}, { $set: {status:"completed"}})
    }
    async updateBet(params){
        await auction.updateOne({_id:params._id},{$set:{currentBet:params.currentBet}})
    }
}
module.exports = AuctionMongoose;