const mongoose = require('mongoose')
const UsersPassSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required : true
    }
})
module.exports = mongoose.model('Passwords',UsersPassSchema)