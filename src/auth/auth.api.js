const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const AuthServices = require('./auth.service');
const AuthService = new AuthServices;
const Random = require('../../lib/RandomString')
const random = new Random();
const Middleware = require('../auth/auth.middlware')
const middlware = new Middleware;

const Age = 1000 * 60 * 60 * 3;

app.post('/login',middlware.checkLogin,async (req,res)=>{
    const params = {
        username: req.body.username,
        password: req.body.password
    }
    const doc = await AuthService.login(params)
    if(doc.id){
        const token = jwt.sign({ uid: doc.id, role: doc.role }, 'token');
        res.cookie('token',token, { maxAge: Age, httpOnly: true });
        res.json(token)
    }
    else{
        res.json(doc);
    }
})
app.get('/me',middlware.Auth,async(req,res)=>{
    const decoded = req.decoded;
    res.json(decoded);
})
app.post('/register',async (req,res)=>{
    const params = {
        id: "user"+random.random(16),
        username: req.body.username,
        password: req.body.password,
        confirmPass : req.body.confirmpass,
        email: req.body.email,
        role:"user",
        accountStatus:"normal"
    }
    const doc = await AuthService.register(params);
    res.json(doc)
})
app.get('/logout',async (req,res)=>{
    res.cookie('token',"", { maxAge: 0, httpOnly: true },{path: '/'});
    res.redirect("/")
})

module.exports = app;