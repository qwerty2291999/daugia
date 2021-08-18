const mongoose = require("./user.notification.schema")
class notifyMongoose {
    async get(id){
        const docs = await mongoose.find(id)
        return docs;
    }
    async create(obj){
        await mongoose.create(obj)
    }
}
module.exports = notifyMongoose;