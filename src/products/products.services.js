const ProductMongoose = require('./products.mongoose')
const { find } = require('./products.schema')
const mongoose = new ProductMongoose
class ProductsService{
    async getAll(){
        const docs = await mongoose.getAll()
        return docs
    }
    async create(params){
        const doc = await mongoose.create(params)
        return doc;
    }
    async findOne(id){
        const doc = await mongoose.findOne({_id:id})
        return doc
    }
    async updateOne(id,params){
        await mongoose.updateOne({_id:id},params)
        const findid = await mongoose.findOne({_id:id})
        if(findid==null){
            return "not found"
        }
        return findid
    }
}
module.exports = ProductsService;