const jwt = require('jsonwebtoken')
const jwtdecode = require('jwt-decode')
class Middleware{
    Auth(req,res,next){
        let token = req.headers.authorization
        if(token.startsWith("Bearer ")){
            token = token.slice(7)
        }
        if(!token){
            return res.status(401).json("token is invalid please relogin")
        }
        if(token == req.cookies.token){
            jwt.verify(token,"token",(err,decoded)=>{
                if(err){
                    // res.cookie('token',"", { maxAge: 0, httpOnly: true },{path: '/'});
                    res.status(401).json('Token is invalid please relogin');
                }
                else{
                    req.decoded = decoded;
                    res.status(200);
                    return next();
                }
            })
        }
        else{
            // res.cookie('token',"", { maxAge: 0, httpOnly: true },{path: '/'});
            return res.status(401).json('Token is invalid please relogin')
        }
    }
    Author(req,res,next){
        const role = req.decoded.role
        if(role=="admin"){
            res.status(200);
            return next();
        }
        return res.status(403).json('You dont have permission to see this')
    }
    checkLogin(req,res,next){
        const token = req.cookies.token;
        if(!token){
            return next()
        }
        return res.status(401).json('You already logged in')
    }
}
module.exports = Middleware;