const check = require('../../lib/CheckPass');
const checkPass = new check;
const AuthMongoose = require('./auth.mongoose')
const mongoose = new AuthMongoose;
const Random = require('../../lib/RandomString')
const random = new Random();
class AuthServices {
    async register(params){
        if(params.password!=checkPass.checkPass(params.password,params.confirmPass)){
            return "please check your password";
        }
        const doc = await mongoose.register(params);
        return doc
    }
    async login(param){
        const doc = await mongoose.findOne({username:param.username});
        if(doc){
            const pw = await mongoose.findOne({_id:doc._id,password:param.password})
            if(pw){
                return doc
            }
            return "wrong password"
        }
        return "wrong username"
    }
    // async logout(param){
    //     const doc = mongoose.findOne()
    // }
}
module.exports = AuthServices;