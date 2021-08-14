const UserMongoose = require('./user.mongoose')
const mongoose = new UserMongoose;
class UserSevices{
    async inventory(id){
        const docs = await mongoose.inventory(id);
        return docs.inventory
    }
    async push(id,item){
        const doc = await mongoose.push(id,item)
        return doc
    }
}
module.exports = UserSevices