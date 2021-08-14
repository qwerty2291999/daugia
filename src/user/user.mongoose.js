const mongoose = require('../auth/auth.account.schema');
class UserMongoose{
    async inventory(id){
        const doc = mongoose.findById(id)
        return doc
    }
    async push(id,item){
        const doc = await mongoose.updateOne(id, { $push: {inventory:item}})
        return doc;
    }
}
module.exports = UserMongoose