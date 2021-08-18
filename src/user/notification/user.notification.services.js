const notifyMongoose = require("./user.notification.mongoose");
const mongoose = new notifyMongoose
class NotificationServices{
    async get(id){
        const docs = await mongoose.get({userID:id})
        return docs;
    }
    async create(obj){
        await mongoose.create(obj)
    }
}
module.exports = NotificationServices;