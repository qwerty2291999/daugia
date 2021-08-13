const mongoose = require('mongoose')
const UsersSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Users',UsersSchema)