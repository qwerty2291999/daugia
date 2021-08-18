const express = require('express');
const PaticipantsServices = require('./participants.sevices');
const app = express.Router();
const service = new PaticipantsServices;
app.get('/',async(req,res)=>{
    const docs = await service.findAll();
    res.json(docs)
})

module.exports = app;