const product = require('./products.schema')
class ProductMongoose{
    async getAll(){
        const docs = await product.find()
        return docs;
    }
    async create(params){
        const doc = await product.create(params)
        return doc
    }
    async findOne(any){
        const doc = await product.findById(any)
        return doc
    }
    async updateOne(id,params){
        const doc = await product.updateOne(id, { $set: params})
        return doc;
    }
}
module.exports = ProductMongoose;