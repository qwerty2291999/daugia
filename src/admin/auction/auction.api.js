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
const now = new Date()

app.get('/',async(req,res)=>{
    const docs = await product.getAll();
    res.json(docs)
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
        dateStart : now,
        dateEnd : timer.nextDay(req.body.end)
    }
    const doc = await auction.create(params);
    res.json(doc)
    }
    
})
module.exports = app;