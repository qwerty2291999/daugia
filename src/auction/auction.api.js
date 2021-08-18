const express = require('express');
const Random = require('../../lib/RandomString');
const app = express.Router();
const AuctionServices = require('../admin/auction/auction.services');
const PaticipantsServices = require('../admin/participants/participants.sevices');
const service = new AuctionServices;
const Middleware = require('../auth/auth.middlware');
const auth = new Middleware;
const participant = new PaticipantsServices;
const random = new Random;

app.use(auth.Auth);

app.get('/',async(req,res)=>{
    const docs = await service.getOngoing()
    res.json(docs)
});
app.get('/single/:id',async(req,res)=>{
    const id = req.params.id;
    const doc = await service.findId({auctionId:id});
    res.json(doc);
})
app.post('/single/:id/bet',async(req,res)=>{
    const aucId = req.params.id
    const uid = req.decoded.uid
    const price = req.body.bet
    const doc = await participant.bet(uid,aucId,price)
    res.json(doc)
})
app.post('/single/:id/join',async(req,res)=>{
    const id = random.random(12);
    const aucId = req.params.id;
    const uid = req.decoded.uid;
    const doc = await participant.create({_id:id,userId:uid,auctionId:aucId})
    res.json(doc)
})

module.exports = app;