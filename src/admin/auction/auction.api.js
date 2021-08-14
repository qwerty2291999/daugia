const express = require('express');
const app = express.Router();
const ProductsService = require('../../products/products.services');
const product = new ProductsService;
const AuctionServices = require('./auction.services');
const auction = new AuctionServices;
const Random = require('../../../lib/RandomString')
const random = new Random();
const Timer = require('../../../lib/Timer');

const timer = new Timer;


app.get('/',async(req,res)=>{
    const docs = await auction.expires();
    res.json(docs)
})
app.get('/ongoing',async(req,res)=>{
    const docs = await auction.getOngoing();
    res.json(docs)
})
app.get('/completed',async(req,res)=>{
    const docs = await auction.getCompleted();
    res.json(docs)
})
app.get('/one/:id',async(req,res)=>{
    const doc = await auction.findId();
    res.json(doc)
})
app.post('/create/:productId',async (req,res)=>{
    const productId = req.params.productId
    const checkExist = await auction.findId({productId});
    if(checkExist){
        res.json("Product is already on")
    }
    else{
        const price = await product.findOne(productId);
        const params = {
        _id : random.random(8),
        auctionId : "auc"+random.symbol(10),
        productId : productId,
        startingPrice : price.productStartingPrice,
        minBet : req.body.min,
        currentBet : 0,
        dateStart : timer.now(),
        dateEnd : timer.nextDay(req.body.end),
        status : "ongoing"
    }
    const doc = await auction.create(params);
    res.json(doc)
    }
})

module.exports = app;