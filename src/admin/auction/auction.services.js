const AuctionMongoose = require("./auction.mongoose");
const mongoose = new AuctionMongoose;

class AuctionServices{
    async create(params){
        const doc = await mongoose.create(params)
        return doc
    }
    async findId(any){
        const doc = await mongoose.findOne(any)
        if(doc==null){
            return "not found"
        }
        return doc
    }
    async getAll(){
        const docs = await mongoose.getAll();
        return docs
    }
}
module.exports = AuctionServices;