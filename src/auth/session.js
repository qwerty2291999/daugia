const mongoose = require('mongoose')
const SessionSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    sessionId:{
        type:String,
        required : true
    }
})
module.exports = mongoose.model('Sessions',SessionSchema)