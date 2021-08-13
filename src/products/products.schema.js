const mongoose = require('mongoose')
const ProductsSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productInfo:{
        type:String,
        required:true
    },
    productStartingPrice:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Products',ProductsSchema)