const user = require('./auth.account.schema')
const pass = require("./auth.password.schema")
class AuthMongoose{
    async register(params){
        const checkExist = await user.findOne({username:params.username})
        if(!checkExist){
            const doc = await user.create({_id:params.id,username:params.username,email:params.email})
            if(doc){
                const password = await pass.create({_id:params.id,password:params.password})
                if(password){
                    return doc
                }
            }
        }
        return `username: ${params.username} is exist`
    }
    async findOne(any){
        if(any.password){
            const doc = await pass.findOne(any)
        return doc
        }
        if(any.username){
            const doc = await user.findOne(any)
            return doc
        }
    }
    async createSession(id,sessionId){
        const createSession = await session.create({_id:id,sessionId})
        return createSession
    }
}
module.exports = AuthMongoose;