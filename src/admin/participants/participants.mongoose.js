const mongoose = require('./participants.schema');
class ParticipantsMongoose {
    async findAll(){
        const docs = await mongoose.find();
        return docs;
    }
    async create(obj){
        const doc = await mongoose.create(obj)
        return doc
    }
    async update(obj){
        const doc = await mongoose.updateOne(obj)
        return doc
    }
    async findOne(id){
        const docs = await mongoose.find(id);
        return docs;
    }
}
module.exports = ParticipantsMongoose