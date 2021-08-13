const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const ProductService = require('./products.services')
const product = new ProductService;
const Random = require('../../lib/RandomString')
const random = new Random();

app.get('/', async (req,res)=>{
    const docs = await product.getAll();
    res.json(docs)
})
app.post('/create', async (req,res)=>{
    const params = {
        _id:random.uppercase(10),
        productName:req.body.name,
        productInfo:req.body.info,
        productStartingPrice:req.body.price
    }
    const doc = await product.create(params)
    res.json(doc)
})
app.get('/:id',async(req,res)=>{
    const id = req.params.id;
    const doc = await product.findOne(id);
    res.json(doc);
})
app.post('/update/:id',async (req,res)=>{
    const id = req.params.id;
    const params = {}
    if(req.body.name){
        params.productName = req.body.name
    }
    if(req.body.info){
        params.productInfo = req.body.info
    }
    if(req.body.price){
        params.productStartingPrice = req.body.price
    }
    const doc = await product.updateOne(id,params)
    res.json(doc)
})

module.exports = app;