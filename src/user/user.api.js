const express = require('express');
const app = express.Router()
const Middleware = require('../auth/auth.middlware');
const auth = new Middleware;
const UserSevices = require('./user.services');
const userService = new UserSevices
app.use(auth.Auth);

app.get("/",async(req,res)=>{
    const decoded = req.decoded
    res.json(`welcome userid : ${decoded.uid}`)
})
app.get('/inventory',async(req,res)=>{
    const decoded = req.decoded
    const docs = await userService.inventory({_id:decoded.uid});
    res.json(docs);
})
// app.post('/push',async(req,res)=>{
//     const item = "1234";
//     const id = {_id:"userbpNJRhio65ysJE5t"}
//     const doc = await userService.push(id,item)
//     res.json(doc);
// })

module.exports = app;