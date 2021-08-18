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
    async sentNotify(){
        const docs = await this.getOngoing();
        const notify = docs.filter((doc)=>{
            const a = timer.countDown(doc.dateEnd);
            let day = a.slice(0,a.indexOf("d"))
            let hours = a.slice(a.indexOf("d")+2,a.indexOf("h"))
            let minute = a.slice(a.indexOf("h")+2,a.indexOf("m"))
            // let second = a.slice(a.indexOf("m")+2,a.indexOf("s"))
            console.log(a)
            if(day==5&&hours==0&&minute==0){
                console.log(doc)
            }
        })
        return notify
    }
}
module.exports = AuctionServices;