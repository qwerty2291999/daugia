const AuctionMongoose = require("./auction.mongoose");
const mongoose = new AuctionMongoose;
const Timer = require('../../../lib/Timer');
const timer = new Timer;
const day = 1000*60*60*24;
class AuctionServices{
    async create(params){
        const doc = await mongoose.create(params)
        return doc
    }
    async findId(any){
        const doc = await mongoose.findOne(any)
        return doc
    }
    async updateOne(params){
        await mongoose.updateOne(params)
    }
    async getAll(){
        const docs = await mongoose.getAll();
        return docs
    }
    async getOngoing(){
        const docs = await mongoose.getAll();
        const onGoing = docs.filter((doc)=>{
            // return new Date(doc.dateEnd).getTime()>Date.now()
            return doc.status == "ongoing"
        })
        return onGoing;
    }
    async getCompleted(){
        const docs = await mongoose.getAll();
        const completed = docs.filter((doc)=>{
            // return new Date(doc.dateEnd).getTime()<Date.now()
            return doc.status == "completed"
        })
        return completed;
    }
    async changeStatus(){
        const docs = await this.getOngoing();
        const filter = docs.filter((doc)=>{
            return new Date(doc.dateEnd).getTime()<Date.now()
        })
        return filter
    }
}
module.exports = AuctionServices;