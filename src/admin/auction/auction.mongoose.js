const auction = require('./auction.schema')
class AuctionMongoose{
    async create(params){
        const doc = await auction.create(params)
        return doc;
    }
    async findOne(any){
        const doc = await auction.findOne(any)
        return doc;
    }
    async getAll(){
        const docs = await auction.find();
        return docs;
    }
}
module.exports = AuctionMongoose;